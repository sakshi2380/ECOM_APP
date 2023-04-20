const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ApiFeatures = require("../utils/apifeatures");
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id
  const product = await Product.create(req.body);
  console.log(product);
  res.status(201).json({
      success: true,
      product,
    });
})
// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
   
    apiFeature.pagination(resultPerPage);
  let products = await apiFeature.query;
  
  let filteredProductsCount = products.length;
  
  //apiFeature.pagination(resultPerPage);

   //products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
  let product = await Product.findById(req.params.id)
if (!product) {
  return next(new ErrorHander("Product not found", 404));
}
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  
})
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
  try {
         const{id} = req.params
         const products = await Product.findByIdAndDelete(id)
         if (!products) {
             return next(new ErrorHander("Product not found", 404));
           }
 res.status(200).json({
     success: true,
     message: "Product Delete Successfully",
   });
     } catch (error) {
         console.log(error.message);
         res.status(500).json({message: error.message}) 
     }
 })
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
  let product = await Product.findById(req.params.id)
  if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  res.status(200).json({
      success: true,
      product,
    });

})

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };


  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user === req.user._id
  );

  console.log(":"+product.reviews.find((rev)=>{ rev.params }));

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
console.log(avg);
  product.reviews.forEach((rev) => {
    console.log("rating"+rev.rating);
    avg += rev.rating;
    console.log(avg);
  });
  console.log(avg);


  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});