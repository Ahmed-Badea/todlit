import styles from './file-uploader-icon.module.scss';
import { IFileUploaderIcon } from '../../../types/file_uploader/file_uploader_icon/fileUploaderIcon';
import { FileIcon, PictureIcon, UploadIcon, VideoIcon } from '../../../assets/Icons/index';

export const FileUploaderIcon = ({
    failed = false,
    icon
}: IFileUploaderIcon) => {
    return (
        <div data-file-uploader-icon-failed={failed} className={styles['file-uploader-icon']}>
            {icon === 'file' && FileIcon}
            {icon === 'image' && PictureIcon}
            {icon === 'video' && VideoIcon}
            {icon === 'upload' && UploadIcon}
        </div>
    )
}