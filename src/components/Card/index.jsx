import styled from "styled-components"


const CardLink = styled.a`
text-decoration : none;
color : black;
&:hover {
    box-shadow: 2px 2px 10px #e2e3e9;
}
`

//Style to truncate text after 6 lines : 
const CardSummary = styled.p`
overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5; 
  -webkit-box-orient: vertical;
  
`

const CardImg = styled.img`
width : 100%;
height : 250px;
`


function Card({ title, url, image_url, news_site, summary, published_at }) {

    return (
        <CardLink href={url}>
            <div className="card shadow" style={{ width: "18rem", height: "36rem" }}>
                <div className="card-header">
                    <h4>{news_site}</h4>
                </div>
                <CardImg src={image_url} className="card-img-top" alt={title} />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <CardSummary className="card-text" >{summary}</CardSummary>
                </div>
                <div className="card-footer">
                    {published_at}
                </div>
            </div>
        </CardLink>
    )

}

export default Card