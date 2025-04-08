import React from "react"
import styles from "../styles/Movie.module.css"
import { useNavigate } from "react-router-dom"
interface MovieProps {
    movie: {
        title: string
        image: string
        age: string
        description: string
        slug: string
    }
}

const Movie: React.FC<MovieProps> = ({ movie }) => {

    const router = useNavigate()
    const handleClickPage = (slug: string) => {
        router(`/movie/${slug}`)
    }

    return (
        <div className={styles.card}>
            <img src={movie.image} alt={movie.title} />
            <div className={styles.cardContent}>
                <div className={styles.cardTitle}>
                    {movie.title} <span className={styles.cardAge}>{movie.age}</span>
                </div>
                <p className={styles.cardDescription}>{movie.description}</p>
                <button onClick={() => handleClickPage(movie.slug)} className={styles.cardButton}>Đặt vé</button>
            </div>
        </div>
    )
}
export default Movie