import styles from "./featured-icon-outline.module.scss";
import { IFeaturedIconOutline } from "../../../types/featured_icon/featured_icon_outline/featuredIconOutline";

export const FeaturedIconOutline = ({
    size = 'md',
    color = 'gray',
    icon
}: IFeaturedIconOutline) => {
    return (
        icon &&
        <div className={styles['featured-icon-outline']}
            data-featured-icon-outline-size={size}
            data-featured-icon-outline-color={color}
        >
            <div className={styles['featured-icon-outline__outer-outline']}>
                <div className={styles['featured-icon-outline__inner-outline']}>
                    {icon}
                </div>
            </div>
        </div>
    )
}