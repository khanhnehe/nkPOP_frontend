import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllType } from '../../../store/actions/adminAction';
import './TypeOutStanding.scss'
import tt from "../../../assets/tt.webp";
import mn from "../../../assets/mn.webp";
import hh from "../../../assets/hh.webp";
import tc from "../../../assets/tc.webp";
import srm from "../../../assets/srm.webp";
import duongam from "../../../assets/dam.webp";
import duongthe from "../../../assets/dthe.webp";
import trangdiem from "../../../assets/trangdiem.webp";
import dtoc from "../../../assets/dthe.webp";
import nchoa from "../../../assets/nchoa.webp";


const TypeOutStanding = () => {
    const dispatch = useDispatch();
    const listType = useSelector(state => state.admin.allType);

    useEffect(() => {
        dispatch(getAllType());
    }, [dispatch]);

    const images = {
        "65ded0eea29db3aa7263cdca": tt,
        "65dd971c9138e32a2f2139b8": mn,
        "65dd8d769138e32a2f213839": tc,
        "65dc8725577eeb57593349f4": hh,
        "65d9ec7e69ab84ef225b174a": srm,
        "65da12e31df683ed3dc00cb5": duongam,
        "65d9ed2f6a396c23fe748d09": duongthe,
        "65d9eb9c4ba2b938a4d6d73d": trangdiem,
        "65e48553fad33e67598e1f40": dtoc,
        "65e48761fad33e67598e1f82": nchoa
    };

    return (
        <div className='Type-container'>
            <div className='Type-title'>
                Danh mục nổi bật
            </div>
            <div className='types-item'>
                {listType.slice(-10).map((type) => (
                    <div className='type-child' id={`div-${type._id}`} key={type._id}>
                        <div className=''>
                            <img id={`img-${type._id}`} className='type-img'
                                src={images[type._id]} />

                        </div>

                        <NavLink to={`/type/${type._id}`}>
                            <span className='type-name'>{type.type_name}</span>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TypeOutStanding;