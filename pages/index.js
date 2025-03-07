import { createClient } from "contentful";

import RecipeCard from "../components/RecipeCard.js";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const response = await client.getEntries({ content_type: "recipe" });

  return {
    props: {
      recipes: response.items,
    },
    revalidate: 1,
  };
}

export default function Recipes({ recipes }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}

      <style jsx>
        {`
          .recipe-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px 60px;
          }
        `}
      </style>
    </div>
  );
}
