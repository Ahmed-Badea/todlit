import styles from './uploaded-item.module.scss';
import { IUploadedItem } from '../../../types/file_uploader/uploaded_item/uploadedItem';
import { FileUploaderIcon } from '../FileUploaderIcon';
import { Button } from '../../Button';
import { TrashIcon, UploadIcon } from '../../../assets/Icons/index';
import TEXT from '../text.json';

export const UploadedItem = ({
    fileType = 'file',
    fileName,
    fileSize,
    state = 'inprogress',
    onDelete,
    uploadAgainHandler,
    percentageCompleted = 0
}: IUploadedItem) => {

    const fileSizeFormatter = (size: number) => {
        const ONE_MEGA_BYTE = 1024 * 1024;
        const ONE_KILO_BYTE = 1000;

        return (
            (size >= ONE_MEGA_BYTE) ?
                `${Math.floor(size / ONE_MEGA_BYTE)}MB`
                :
                (
                    (size >= ONE_KILO_BYTE) ?
                        `${Math.floor(size / ONE_KILO_BYTE)}KB`
                        :
                        `${size}Bytes`
                )
        )
    }

    return (
        <div data-file-uploaded-item-state={state} className={styles['file-uploaded-item']}>
            <div className={styles['file-uploaded-item__icon']}>
                <FileUploaderIcon failed={state === 'failed'} icon={fileType} />
            </div>
            {
                state !== 'failed' ?
                    <div className={styles['file-uploaded-item__info-box']}>
                        <div className={styles['file-uploaded-item__info-box__file-details']}>
                            <div className={styles['file-uploaded-item__info-box__file-details__file-name']}>
                                {fileName && <div> {fileName} </div>}
                                {percentageCompleted === 100 && <Button size='sm' leadingIcon={TrashIcon} color='danger' variant='link'
                                    onClickHandler={onDelete} />
                                }
                            </div>
                            {
                                fileSize &&
                                <div className={styles['file-uploaded-item__info-box__file-details__file-size']}>
                                    {fileSizeFormatter(Number(fileSize))}
                                </div>
                            }
                        </div>
                        <div className={styles['file-uploaded-item__info-box__progress-box']}>
                            <div className={styles['file-uploaded-item__info-box__progress-box__progress-track']}>
                                <div className={styles['file-uploaded-item__info-box__progress-box__progress-track__bar']}
                                    style={{ width: `${percentageCompleted}%` }}>
                                </div>
                            </div>
                            <div className={styles['file-uploaded-item__info-box__progress-box__percentage']}>{`${percentageCompleted}%`}</div>
                        </div>
                    </div>
                    :
                    <div className={styles['file-uploaded-item__failed-info-box']}>
                        <div className={styles['file-uploaded-item__failed-info-box__upload-failed']}>
                            {TEXT.uploadFailedTryAgain}
                        </div>
                        <div className={styles['file-uploaded-item__failed-info-box__upload-info']}>
                            {
                                `${fileSizeFormatter(Number(fileSize))} - ${percentageCompleted}% ${TEXT.uploaded}`
                            }
                        </div>
                        <Button size='sm' text={TEXT.uploadAgain} leadingIcon={UploadIcon} color='danger' variant='outlined'
                            onClickHandler={uploadAgainHandler} />
                    </div>
            }

        </div>
    )
}