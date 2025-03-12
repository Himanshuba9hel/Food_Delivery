import React from 'react'
import './Exploremenu.css'
import { menu_list } from '../../assets/assets'
const Exploremenu=({cotegory,setcotegory}) =>{
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>  
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest and culinary expertise.Our Miission is to satisfy your craving and elevate your dining experience, one delicious meal at a time</p>
       <div className='explore-menu-list'>
        {menu_list.map((item,index)=>{
            return(
                <div onClick={()=>setcotegory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-item'>
                    <img className={cotegory===item.menu_name?"active":" "} src={item.menu_image} alt="" />
                    {item.menu_image}
                    <p>{item.menu_name}</p>
                 
                    </div>
            )
        })}
       </div>
       <hr />
    </div>
  )
}

export default Exploremenu
