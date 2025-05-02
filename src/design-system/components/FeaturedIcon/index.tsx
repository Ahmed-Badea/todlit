import styles from "./featured-icon.module.scss";
import { IFeaturedIcon } from "../../types/featured_icon/featuredIcon";

export const FeaturedIcon = ({
    size = 'md',
    color = 'gray',
    icon
}: IFeaturedIcon) => {
    return (
        icon &&
        <div
            className={styles['featured-icon']}
            data-featured-icon-size={size}
            data-featured-icon-color={color}
        >
            {icon}
        </div>
    )
}