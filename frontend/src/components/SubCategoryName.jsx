const SubCategoryName = (props)=>{

   console.log(props)

   return <button onClick={()=> props.display(props.subData._id)}>{props.subData.subcategory}</button>
}

export default SubCategoryName