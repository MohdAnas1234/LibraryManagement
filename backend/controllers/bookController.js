const Book = require("../models/Book");

exports.getBooks = async (req,res)=>{
  const books = await Book.find();
  res.json({success:true,books});
};

exports.addBook = async (req,res)=>{
  const {title,author,category,quantity} = req.body;

  const book = new Book({
    title,
    author,
    category,
    quantity,
    availableCopies:quantity
  });

  await book.save();

  res.json({success:true,message:"Book added"});
};

exports.searchBooks = async (req,res)=>{

  const {title,author,category} = req.query;

  const query={};

  if(title) query.title={$regex:title,$options:"i"};
  if(author) query.author={$regex:author,$options:"i"};
  if(category) query.category={$regex:category,$options:"i"};

  const books = await Book.find(query);

  res.json({success:true,books});
};