import React from "react";
import { getProducts, deleteProduct, postProduct } from "../../actions";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

class Home extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const { products, isLoading } = this.props;
    if (isLoading) return "Loading...";
    if (!products || !products.length) return "No products";
    return (
      <div>
        {products.map(product => (
          <div key={product.code}>
            <div>Código: {product.code}</div>
            <div>Nombre: {product.name}</div>
            <div>Precio: {product.price}</div>
            <div>Descripción: {product.description}</div>
            <div>Stock: {product.amount}</div>
            <img src={product.photo} alt="photo" />
            <button onClick={() => this.props.deleteProduct(product.code)}>
              Delete
            </button>
          </div>
        ))}
        <Formik
          initialValues={{
            code: "",
            name: "",
            price: 0,
            photo: "https://via.placeholder.com/150",
            description: "",
            amount: 0
          }}
          onSubmit={values => {
            this.props.postProduct(values);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
              <Field type="text" name="code" placeholder="code" />
              <Field type="text" name="name" placeholder="name" />
              <Field type="number" name="price" placeholder="price" />
              <Field type="text" name="description" placeholder="description" />
              <Field type="number" name="amount" placeholder="amount" />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = {
  getProducts,
  deleteProduct,
  postProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
