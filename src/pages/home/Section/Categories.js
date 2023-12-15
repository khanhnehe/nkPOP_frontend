import React, { Component } from 'react';
// import './Categories.scss';
import { categories } from '../../../components/Sidler/data'; // Import responsive and productData
import { Link } from 'react-router-dom';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    render() {
        return (
            <>
                <div className='container'>
                    <span>
                        <h3>Danh mục sản phẩm</h3>
                    </span>
                    <div className='row m-2'>
                        {categories.map((item, index) => (
                            <Link
                                to={`/categorie/${item.id}`}
                                key={item.id}
                                className='item-link'
                            >
                                <div className='custom'>
                                    <img
                                    // src={item.image}
                                    // alt={item.title}
                                    // className='custom-img'
                                    />
                                </div>
                                <h3>{item.title}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

// ... (các phần khác của mã nguồn)


export default Categories;
