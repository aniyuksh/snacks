import React, { useEffect, useState } from 'react'
import { snacks } from './data'

// let initialState = snacks;
const Table = () => {
 
    const [data, setData] = useState(snacks)
    const [inputData, setInputData ] = useState("");
    const [sortBy , setSortBy] = useState({
        order : "ascending",
        type : "id"
    })

    function handleInputChange(e){
        e.preventDefault();
        if(inputData === ""){
            setData(snacks)
        }
        setInputData(e.target.value);
    }

    function sortingFunction (e){
        e.preventDefault();
        let type = e.target.dataset.value;
        console.log(type)

        if(type === sortBy.type){
            if(sortBy.order === "descending"){
                setSortBy(
                    (prev)=>({...prev , type : "id" , order : "ascending"})
                )
            }
            else{
                setSortBy(
                    (prev)=>({...prev , order : "descending"})
                )
            }
        }
        else{
            setSortBy(
                (prev)=>({...prev , type : type , order : "ascending"})
            )
        }
    }

    useEffect(()=>{
        console.log(sortBy)
        if(sortBy.type === "id" || sortBy.type === "product_weight" || sortBy.type === "price" || sortBy.type === "calories"){
            if(sortBy.order === "ascending"){
                setData((prev)=>prev.sort((a,b)=>a[sortBy.type]-b[sortBy.type]))
            }
            else{
                
                    setData((prev)=>prev.sort((a,b)=>b[sortBy.type]-a[sortBy.type]))
            }
        }
        else if(sortBy.type === "product_name" || sortBy.type === "ingredients"){
                if(sortBy.order === "ascending"){
                    setData((prev)=>prev.sort((a,b)=>a[sortBy.type].toLowerCase() < b[sortBy.type].toLowerCase() ? -1 :  1))
                }
                else{
                    setData((prev)=>prev.sort((a,b)=>b[sortBy.type].toLowerCase() < a[sortBy.type].toLowerCase() ? -1 :  1))
                }
        }
        
    },[sortBy])

    useEffect(()=>{
        setData((prev)=>([...prev.filter((item)=>item?.product_name?.toLowerCase().includes(inputData.toLowerCase()) || item?.ingredients?.filter((item)=>item.toLowerCase().includes(inputData)).length)]))
    },[inputData])



  return (
    <div>
        <div>
            <h1>Snacks Table</h1>
        </div>
        <div>
            <input type="text" placeholder='Search Snacks..!' onChange={(e)=>handleInputChange(e)}/>
            <table>
                <tr>
                    <th data-value="id"  onClick={(e)=>sortingFunction(e)}>
                        ID
                    </th>
                    <th data-value="product_name" onClick={(e)=>sortingFunction(e)}>
                        Product Name
                    </th>
                    <th data-value="product_weight" onClick={(e)=>sortingFunction(e)}>
                        Product Weight
                    </th>
                    <th data-value="price" onClick={(e)=>sortingFunction(e)}>
                        Price(INR)
                    </th>
                    <th data-value="calories" onClick={(e)=>sortingFunction(e)}>
                        Calories
                    </th>
                    <th data-value="ingredients" onClick={(e)=>sortingFunction(e)}>
                        Ingredient
                    </th>
                </tr>
                {
                    data.map((item)=>{
                        return(
                            <>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.product_weight}</td>
                                    <td>{item.price}</td>
                                    <td>{item.calories}</td>
                                    <td>{item.ingredients}</td>
                                </tr>
                            </>
                        )
                    })
                }
            </table>
        </div>
    </div>
  )
}

export default Table