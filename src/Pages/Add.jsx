import React,{ useState } from 'react' 
import '../style/add.css';
import { getAxios, postAxios, putAxios } from '../useAxios/useAxios';

function Add(props) {
  if(props.editID.id != ""){
    getAxios(`/Product/${props.editID.category}/${props.editID.id}`)
    .then((response)=>{
      let data = response.data
      if(data[0].category){
        setFormValue({name:data[0].name,image:data[0].image,price:data[0].price,discount:data[0].discount,category:data[0].category,type:data[0].type,rating:data[0].rating,inStock:data[0].inStock,deliveryfree:data[0].deliveryfree})
        if(data[0].category=="Electronic")
          setPropertyData({RAM:data[0].RAM,ROM:data[0].ROM,color:data[0].color,battery:data[0].battery})
        setCategoryIndex(categoryArray.findIndex(ele => ele == data[0].category));
        setEditProduct(props.editID.id)
        props.setEditID({id:"",category:""});
      }
    })
    .catch((err)=>console.log(err))
  }
  const [edited,setEditProduct] = useState("")
  const categoryArray = ["Select","Electronic","Application","Fashion","Home","Grocery","Toys"];
  const typeArray = [["Select Category First"],["Select","Phone","Tablet","Laptop"],["Select","Washing Machine","TV","Air Conditioners","Fan"],["Select","Man","Women","Kids"],
                    ["Select","Furniture","Kitchen","Bedroom"],["No Type"],["No Type"]]
  const propertyArray = {
                          RAM:["3 GB","4 GB","6 GB","8 GB","12 GB"],
                          ROM:["12 GB","32 GB","64 GB","164 GB","248 GB","500 GB","1 TB"],
                          color:["Silver","Black","Gray"],
                          battery:["3400 mAh","4000 mAh","4500 mAh","5000 mAh","7500 mAh","8500 mAh","10000 mAh"],
                          rating:["Bad","Poor","Good","Average","Excellent"]
                        }
  const intialValues = {
                        name:"",image:"",price:0,discount:0,category:"",type:"",rating:"",inStock:false,deliveryfree:false
                      }
  const initialPropElectro = {RAM:"",ROM:"",color:"",battery:""}                   
  const [formValues, setFormValue] = useState(intialValues)
  const [categoryIndex,setCategoryIndex] = useState(0);
  const [propertySet,setPropertyData] = useState(initialPropElectro)                    
  const onhandlechange = (e) =>{
    const {name,value,checked,selectedIndex} = e.target
    console.log(name,value)
    if(e.target.id == 'category'){ 
      setCategoryIndex(selectedIndex); 
      setFormValue(formValues.type="") }
    if(e.target.type=='radio' ){
      if(name=="rating")
      setFormValue({...formValues,[name]:value})
      else 
      setPropertyData({...propertySet,[name]:value})
    }
    else if(e.target.type=='checkbox') setFormValue({...formValues,[name]:checked})
    else setFormValue({...formValues,[name]:value})
    //console.log(formValues)

  }
  const makeRadio = (name,array) =>{
    return    array.map(ele=><>
        <div className='cxblock'>
        <input type='radio' name={name} value={ele} checked={ propertySet[name] == ele ? true : false } onChange={onhandlechange} />
        <label>{ele}</label>
        </div>
        </>
        )
  }
  const validation = (data) => {
    document.getElementById("err_name").innerHTML = data.name=="" ? "Please Enter Product Name" : ""
    document.getElementById("err_image").innerHTML = data.image=="" ? "Please Enter Product Image" : ""
    document.getElementById("err_price").innerHTML = data.price==0 ? "Please Enter Product Price" : ""
    document.getElementById("err_categoty").innerHTML = data.category=="" ? "Please select Product Category" : ""
    document.getElementById("err_type").innerHTML = 
      (data.type=="" && data.category!="Grocery" && data.category!="Toys") ? 
      "Please select Product Type" : ""
    if(data.category == "Electronic"){
      document.getElementById("error_ram").innerHTML = data.RAM=="" ? "Please select RAM" : ""
      document.getElementById("error_rom").innerHTML = data.ROM=="" ? "Please select ROM" : ""
      document.getElementById("error_color").innerHTML = data.color=="" ? "Please select Color" : ""
      document.getElementById("error_battery").innerHTML = data.battery=="" ? "Please select Battery" : ""
      if(document.getElementById("err_name").innerHTML=="" && document.getElementById("err_image").innerHTML=="" && 
      document.getElementById("err_price").innerHTML=="" && document.getElementById("err_categoty").innerHTML=="" &&
      document.getElementById("error_ram").innerHTML=="" && document.getElementById("error_rom").innerHTML=="" && 
      document.getElementById("error_color").innerHTML=="" && document.getElementById("error_battery").innerHTML=="")
        return true
      else 
        return false
    }
    else if(document.getElementById("err_name").innerHTML=="" && document.getElementById("err_image").innerHTML=="" && 
      document.getElementById("err_price").innerHTML=="" && document.getElementById("err_categoty").innerHTML=="" )
      return true;
    else
      return false;
  }
  const  addProduct = () =>{
    let product = null;
    if(formValues.category == "Electronic")
      product = {...formValues,...propertySet}
    else 
    product = formValues
    if(validation(product)){
      postAxios("/add",product)
      .then((response)=>alert(response.data))
      .catch(err=>alert(err))
      reset()
    }
  }
  const editProduct =()=>{
    let product = null;
    if(formValues.category == "Electronic")
      product = {...formValues,...propertySet}
    else 
    product = formValues
    if(validation(product)){
      putAxios(`/edit/${edited}`,product)
      .then((response)=>{
          if(response.data.modifiedCount == 1)
            alert("Successfully Done")
          else 
            alert("Error")
      })
      .catch((err)=>console.log(err))
      setEditProduct("")
      reset()
    }
  }
  const reset = () => {
    setFormValue(intialValues)
      setPropertyData(initialPropElectro)
      setCategoryIndex(0)
      setEditProduct("")
      props.setEditID({id:"",category:""});
  }

  return (
    <div className="App">
      <div className='form'>
        <div className='basic-details'>
          <div className="block" style={{width:"50%"}}>
            <label className="label">Product Name</label>
            <input className="txtinput" id="name" name="name" value={formValues.name} placeholder="Enter Product Name" onChange={onhandlechange}/>
            <div className='error' id="err_name"></div>
          </div>
          <div className="block" style={{width:"50%"}}>
            <label className="label">Product Image</label>
            <input className="txtinput" id="image" name="image" value={formValues.image} placeholder="http//example.jpg" onChange={onhandlechange}/>
            <div className='error' id="err_image"></div>
          </div>
          <div className="block" style={{width:"25%"}}>
            <label className="label">Current Price</label>
            <input className="txtinput" id="price" name="price" value={formValues.price} onChange={onhandlechange}/>
            <div className='error' id="err_price" ></div>
          </div>
          <div className="block" style={{width:"25%"}}>
            <label className="label">Discount(In %)</label>
            <input className="txtinput" id="discount" name="discount" value={formValues.discount} onChange={onhandlechange} style={{width:"50%"}}/>
            <div className='error' id="err_discount"></div>
          </div>
        </div>
        <div className='category-details'>
          <div className='cblock'>
            <label className='label'>Category</label>
            <div id=''>
            <select id='category' className='dropdown' name='category' value={formValues.category} onChange={onhandlechange}>
              {categoryArray.map((ele,index)=><option data-index={index} value={ele} >{ele}</option>)}  
            </select>    
            </div>
            <div className='error' id='err_categoty'></div>
          </div>
          <div className='cblock'>
            <label className='label'>Type</label>
            <div id='type'>
            <select id='type' className='dropdown' name='type' value={formValues.type} onChange={onhandlechange} disabled={categoryIndex==0 || categoryIndex==5 || categoryIndex==6 ? 'disabled':"" }>
              {typeArray[categoryIndex].map((ele,index)=><option data-index={index} value={ele} >{ele}</option>)}  
            </select>    
            </div>
            <div className='error' id='err_type'></div>
          </div>
        </div>
        <div className='ele-discription' style={{display:(formValues.category=="Electronic" ? "block":"none")}}>
          <div className='disc-item'>
            <label className='disc-item-label'>RAM :- </label>
            { makeRadio('RAM',propertyArray.RAM) }
          </div>
          <div className='error' id='error_ram'></div>

          <div className='disc-item'>
            <label className='disc-item-label'>ROM :- </label>
            { makeRadio('ROM',propertyArray.ROM) }
          </div>
          <div className='error' id='error_rom'></div>

          <div className='disc-item'>
            <label className='disc-item-label'>Color :- </label>
            { makeRadio('color',propertyArray.color) }
          </div>
          <div className='error' id='error_color'></div>

          <div className='disc-item'>
            <label className='disc-item-label'>Battery :- </label>
            { makeRadio('battery',propertyArray.battery) }
          </div>
          <div className='error' id='error_battery'></div>
        </div>
        
        <div className='addon'>
          <div className='disc-item'>
            <label className='disc-item-label'>Rating :-</label>
            { 
                  propertyArray.rating.map(ele=>
                  <>
                  <div className='cxblock'>
                  <input type='radio' name="rating" value={ele} checked={formValues.rating == ele ? true : false} onChange={onhandlechange} />
                  <label>{ele}</label>
                  </div>
                  </>)
            }
          </div> 
          <div className='addon-item'>
            <input type='checkbox' name='inStock' value={formValues.inStock} checked={formValues.inStock} onChange={onhandlechange} />
            <p>The product is avaliable in stock</p>
          </div>
          <div className='addon-item'>
            <input type='checkbox' name='deliveryfree' value={formValues.deliveryfree} checked={formValues.deliveryfree} onChange={onhandlechange}/>
            <p>Delivery charges included in Price</p>
          </div>
        </div>
        <div>
          <div className='btn'>
            {edited == "" ? 
              <button className='m_btn' onClick={(e) => addProduct(e)}>Add Product</button>
            :
              <button className='m_btn' onClick={(e) => editProduct(e)}>Edit Product</button>}
            <button className='m_btn' onClick={(e) => reset(e)}>Reset Data</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
