import React, {Component} from 'react'
import gql from 'graphql-tag'
import {Query, graphql} from 'react-apollo'
import MovieReviews from './MovieReviews'
import MovieCredits from './MovieCredits'


class MovieInfo extends Component {
    constructor() {
        super();
        this.state={
            video: null
        }
    }
    videoDisplay(video){
        this.setState({
            video
        })
    }
    videoExit(){
        this.setState({
            video: null
        })
    }
    videoToggle(){
        if(this.state.video) return(
            <div className="youtube-video">
                <p onClick={() => this.videoExit()}>close</p>
                <iframe width="560" height="315" src={`//www.youtube.com/embed/${this.state.video}`} frameBorder="0" allowFullScreen />
            </div>
        )
    }
    renderVideos(videos){
        return videos.map(video => {
            return (
                <img key={video.id}
                    onClick={()=> this.videoDisplay(video.key)}
                    className="video_thumbs"
                    src={`http://img.youtube.com/vi/${video.key}/0.jpg`}
                />
            )
        })
    }
    render() {
        const id = this.props.match.params.id;
        return (
            <Query query={query} variables={{id}} >
            {
                (({loading, err, data}) => {
                    if(loading) return <div>loading</div>
                    return(
                        <div>
                            <header style={{backgroundImage:  'url("https://image.tmdb.org/t/p/w500///'+data.movieInfo.poster_path+'")'}}>
                                <h2 className="title">{data.movieInfo.title}</h2>
                            </header>
                            <article className="wrapper">  
                                <p className="description">{data.movieInfo.overview}</p>                
                                <div className="sidebar">
                                    <img src={"https://image.tmdb.org/t/p/w500///"+data.movieInfo.poster_path} className="cover_image" alt="" />
                                    <ul>
                                        <li><strong>Genre:</strong> {data.movieInfo.genres}</li>
                                        <li><strong>Released:</strong>{data.movieInfo.release_date}</li>
                                        <li><strong>Rated:</strong> {data.movieInfo.vote_average}</li>
                                        <li><strong>Runtime:</strong> {data.movieInfo.runtime}</li>
                                        <li><strong>Production Companies:</strong> {data.movieInfo.production_companies}</li>
                                    </ul>
                                    <div className="videos">
                                        {this.videoToggle()}
                                        <h3>Videos</h3>
                                        {this.renderVideos(data.movieInfo.videos)}
                                    </div>
                                        {/* reviews */} 
                                        <MovieReviews reviews={data.movieInfo.MovieReviews} />
                                </div>
                                    {/* credits */}                                       
                                    <MovieCredits credits={data.movieInfo.movieCredits} />  
                            </article>
                        </div>
                    )
                })
            }
            </Query>
        )
    }
}

const query = gql`

query MovieInfo($id: String) {
    movieInfo(id: $id) {
        title
        overview
        poster_path
        genres
        release_date
        vote_average
        runtime
        production_companies
        videos {
            id
            key
        }
        movieReviews {
            id
            content
            author
        }
        movieCredits {
            id
            character
            name
            profile_path
            order
        }
    }
}
`;

export default graphql(query)(MovieInfo);