import { useState, useEffect } from 'react';
import styles from './file-uploader.module.scss';
import { IFileUploader } from '../../types/file_uploader/fileUploader';
import { FileUploaderIcon } from './FileUploaderIcon';
import { Button } from '../Button';
import { UploadedItem } from './UploadedItem';
import TEXT from './text.json';

export const FileUploader = ({
    label,
    labelHint,
    hintText,
    disabled = false,
    allowedFormats,
    allowedSize, // in MBs
    previouslyUploadedFile,
    isServerError = false,
    onClickHandler,
    onUploadHandler
}: IFileUploader) => {
    const [invalid, setInvalid] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [serverError, setServerError] = useState<boolean>(isServerError);
    const [uploadedFile, setUploadedFile] = useState<File | undefined>();
    const [UploadedFileInfo, setUploadedFileInfo] = useState<{ name: string, size?: number }>({ name: '' });

    useEffect(() => {
        setServerError(isServerError);
    }, [isServerError]);

    const displayAllowedFormats = (arrOfFormats: Array<string> | undefined) => {
        const COMMA_SEPARATED_FORMATS = arrOfFormats?.join(', ').toUpperCase();
        const FINAL_DISPLAY = COMMA_SEPARATED_FORMATS?.replace(/,([^,]*)$/, ` or $1`); // remove the last comma with 'or'

        return FINAL_DISPLAY;
    }

    const fileUploadHandler = (e: any, file?: File) => {
        setInvalid(false);
        setErrorMsg('');
        const FILE = ((e?.target?.files && e?.target?.files[0]) || file);
        const MAX_SIZE: any = allowedSize && (allowedSize * 1024 * 1024);

        if (!FILE) {
            setInvalid(true);
            setErrorMsg(TEXT.errorMsgs.noFileUploaded);
            return;
        };

        if (FILE.size > MAX_SIZE) {
            setInvalid(true);
            setErrorMsg(TEXT.errorMsgs.fileSize.replace('{{size}}', String(allowedSize)));
            return;
        };

        if (!allowedFormats?.includes(`${FILE.type.split('/')[1]}`)) {
            setInvalid(true);
            setErrorMsg(TEXT.errorMsgs.notSupportedFormat);
            return;
        };

        onUploadHandler && onUploadHandler(FILE);
        setUploadedFile(FILE);
        setUploadedFileInfo({ name: FILE.name, size: FILE.size });
        setInvalid(false);
        setServerError(false);
        setErrorMsg('');
        if (e && e.target) {
            e.target.value = null;
        }
    }

    const handleUploadAgain = () => {
        const fileInputField: HTMLElement | null = document.getElementById("file-upload-input");
        fileInputField && fileInputField.click();
    }

    const handleFileDelete = () => {
        setInvalid(false);
        setErrorMsg("");
        setUploadedFile(undefined);
        setUploadedFileInfo({ name: '' });
        onUploadHandler && onUploadHandler(undefined);
    };

    const checkFileType = (fileName: string) => {
        return (
            fileName.includes('png') ||
            fileName.includes('jpg') ||
            fileName.includes('jpeg') ||
            fileName.includes('webp')
        ) ? 'image' : 'file';
    };

    useEffect(() => {
        previouslyUploadedFile && setUploadedFileInfo({ name: previouslyUploadedFile});
    }, [previouslyUploadedFile]);

    return (
        <div tabIndex={0} data-file-uploader-base-disabled={disabled} className={styles['file-uploader']}>
            {
                (label || labelHint) &&
                <div className={styles['file-uploader__label']}>
                    {label}
                    {labelHint && <span className={styles['file-uploader__label-hint']}>{` ${labelHint}`}</span>}
                </div>
            }
            {
                (UploadedFileInfo.name && !errorMsg && !invalid) ?
                    (
                        (serverError) ?
                            <>
                                <input type="file" accept={allowedFormats?.join()} title='' id='file-upload-input' onChange={fileUploadHandler} style={{ display: "none" }} />
                                < UploadedItem
                                    fileType={checkFileType(UploadedFileInfo.name)}
                                    fileName={UploadedFileInfo.name}
                                    state='failed' percentageCompleted={100} uploadAgainHandler={handleUploadAgain}
                                />
                            </>
                            :
                            < UploadedItem
                                fileType={checkFileType(UploadedFileInfo.name)}
                                fileName={UploadedFileInfo.name}
                                fileSize={UploadedFileInfo.size ? `${UploadedFileInfo.size}` : ''}
                                state='completed' percentageCompleted={100} onDelete={handleFileDelete}
                            />
                    )
                    :
                    <>
                        <div className={`${styles['file-uploader__upload-container']} ${invalid ? styles['file-uploader__upload-container--invalid'] : ''}`}
                            onClick={onClickHandler}>
                            <FileUploaderIcon icon={'upload'} />
                            <div className={styles['file-uploader__upload-container__info-box']}>
                                <div className={styles['file-uploader__upload-container__info-box__action-txt']}>
                                    <Button color='primary' variant='link' size='sm' text={TEXT.clickToUpload} onClickHandler={onClickHandler} />
                                    <span>{TEXT.dragAndDrop}</span>
                                </div>
                                <div className={styles['file-uploader__upload-container__info-box__supporting-txt']}>
                                    {displayAllowedFormats(allowedFormats)}
                                    {` ${TEXT.maxSize.replace('{{size}}', String(allowedSize))}`}
                                </div>
                            </div>
                            <input type="file" accept={allowedFormats?.join()} title='' onChange={fileUploadHandler} />
                        </div>
                        {
                            (hintText || errorMsg) &&
                            <div className={`${errorMsg ? styles['file-uploader__error-msg'] : styles['file-uploader__hint-text']}`}>
                                {errorMsg || hintText}
                            </div>
                        }
                    </>
            }
        </div>
    )
}