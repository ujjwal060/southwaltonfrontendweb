import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "Title 1",
      description:
        "An introduction to using Redux for managing state in large applications.",
      image:
        "https://img.freepik.com/premium-photo/social-media-blog-concept-futuristic-icon-design-graphics-hand-with-smartphone_102583-6104.jpg?uid=R187744377&ga=GA1.1.2076956031.1739515128&semt=ais_hybrid",
    },
    {
      id: 2,
      title: "Title 2",
      description:
        "An introduction to using Redux for managing state in large applications.",
      image:
        "https://img.freepik.com/premium-photo/social-media-blog-concept-futuristic-icon-design-graphics-hand-with-smartphone_102583-6104.jpg?uid=R187744377&ga=GA1.1.2076956031.1739515128&semt=ais_hybrid",
    },
    {
      id: 3,
      title: "Title 3",
      description:
        "An introduction to using Redux for managing state in large applications.",
      image:
        "https://img.freepik.com/premium-photo/social-media-blog-concept-futuristic-icon-design-graphics-hand-with-smartphone_102583-6104.jpg?uid=R187744377&ga=GA1.1.2076956031.1739515128&semt=ais_hybrid",
    },
  ];

  return (
    <>
      <div className="breadcrumb-container">
        <div className="breadcrumb-overlay">
          <h2>Latest Blogs</h2>
          <p>
            <Link to="/">Home</Link> / <span>Blogs</span>
          </p>
        </div>
      </div>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Blogs</h1>
        <div className="row">
          {blogs.map((blog) => (
            <div key={blog.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img
                  src={blog.image}
                  className="card-img-top"
                  alt={blog.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.description}</p>
                  {/* <button className="btn btn-primary">Read More</button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
