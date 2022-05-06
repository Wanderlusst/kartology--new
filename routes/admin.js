var express = require('express');
const { redirect, render } = require('express/lib/response');
const async = require('hbs/lib/async');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')


/* GET users listing. */
router.get('/', function(req, res, next) {
 
  productHelpers.getAllProducts().then((products)=>{

console.log(products)
res.render('admin/view-products',{admin:true,products})
  })
  router.get('/login',(req,res)=>{
    if(req.session.admin){
      res.redirect('/')
    }else{
  
   res.render('admin/login',{"loginErr":req.session.adminLoginErr})
   req.session.adminLoginErr=false
  
    }
     
  
  })

  
});
router.get('/add-products',function(req,res){
  res.render('admin/add-products')

})
router.post('/add-products',(req,res)=>{
  console.log('sdfsdfsdf')
  console.log(req.body );
  console.log(req.files.image);

  productHelpers.addproduct(req.body,(id)=>{
    let image=req.files.image
    console.log(id);
    image.mv('./public/product-image/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-products")
      }else{
        console.log(err);

      

      }
    })
    res.render("admin/add-products")
  })
})

router.get('/delete-product/:id',(req,res)=>{
let proId=req.params.id
console.log(proId);
productHelpers.deleteProduct(proId).then((response)=>{
  res.redirect('/admin/')
})


})

router.get('/edit-product/:id',async (req,res)=>{
 let product=await productHelpers.getProductDetails(req.params.id)
 console.log(product);


  res.render('admin/edit-product',{product})
})
router.post('/edit-product/:id',(req,res)=>{
  console.log(req.params.id);
  let id=req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.Image){
        let image=req.files.Image
        image.mv('./public/product-image/'+id+'.jpg')

    }
  })
})
module.exports = router;