import React, { useEffect, useState } from 'react'
import RecipeItem from '../components/RecipeItem'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const baseUrl = import.meta.env.VITE_BASE_URL;

 
const AuthorRecipes = () => {
    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`${baseUrl}/recipes/users/${id}`)
                setRecipes(response?.data)
            } catch (err) {
                console.log(err);
            }
            setIsLoading(false)
        }
        fetchRecipes()
    }, [id])

    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            <div className="container">
                {recipes.length > 0 ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl m-auto py-12">
                        {recipes.map(({ _id, thumbnail, category, title, instructions, creator, createdAt }) => (
                            <RecipeItem
                                key={_id}
                                recipeId={_id}
                                thumbnail={thumbnail}
                                category={category}
                                title={title}
                                // ingredients={instructions}  
                                instructions={instructions}
                                userId={creator}
                                createdAt={createdAt}
                            />
                        ))}

                    </div> :
                    <div className='h-80 items-center flex justify-center'>
                        <h2 className="text-3xl font-bold text-gray-800 text-center">No Recipes Found</h2>
                    </div>}
            </div>
        </>

    )
}


export default AuthorRecipes
