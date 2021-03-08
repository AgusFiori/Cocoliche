const SubCategoryName = (props)=>{
   return <button className="w-100" onClick={()=> props.display(props.subData._id)}>{props.subData.subcategory}</button>
}

export default SubCategoryName