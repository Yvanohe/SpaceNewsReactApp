import styled from "styled-components"


const CardLink = styled.a`
text-decoration : none;
color : black;
text-align : center;
`

function ArticleCard({ title, url, image_url, news_site, summary, published_at }) {

    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-header">
                <CardLink href={url}><h4>{news_site}</h4></CardLink>
            </div>
            <CardLink href={url}><img src={image_url} className="card-img-top" alt={title} /></CardLink>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{summary}</p>
            </div>
            <div className="card-footer">
                {published_at}
            </div>
        </div>
    )

}

export default ArticleCard