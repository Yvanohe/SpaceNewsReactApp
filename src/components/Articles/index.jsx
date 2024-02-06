import Card from "../Card"
import styled from 'styled-components';


const CardsContainer = styled.div`
    display: flex;
    flex-wrap : wrap;
    gap: 24px;
    justify-content : center; 
    align-items: center;
    
  `

function Articles({ articlesList }) {



    return (
        <CardsContainer>
            {articlesList?.map((article) =>
            (
                <Card
                    key={article.id}
                    title={article.title}
                    url={article.url}
                    image_url={article.image_url}
                    news_site={article.news_site}
                    summary={article.summary}
                    published_at={article.published_at} />
            )
            )}
        </CardsContainer>

    )


}

export default Articles