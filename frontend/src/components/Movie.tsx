import React from "react"
import styles from "../styles/Movie.module.css"
interface MovieProps {
    movie: {
        title: string;
        image: string;
        age: string;
        description: string;
    };
}

const Movie: React.FC<MovieProps> = ({ movie }) => {
    return (
        <div className={styles.card}>
            <img src={movie.image} alt={movie.title} />
            <div className={styles.cardContent}>
                <div className={styles.cardTitle}>
                    {movie.title} <span className={styles.cardAge}>{movie.age}</span>
                </div>
                <p className={styles.cardDescription}>{movie.description}</p>
                <button className={styles.cardButton}>Đặt vé</button>
            </div>
        </div>
    )
}
export default Movie