import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./Chart_Daily.scss"
import { IoMdMore } from "react-icons/io";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaChevronDown } from "react-icons/fa";
import "react-circular-progressbar/dist/styles.css";
import { dailyRevenue } from "../../store/actions/productAction";


const Featured = () => {
    const dispatch = useDispatch();
    const revenue = useSelector(state => state.admin.dailyRevenue);
    const percentage = Math.min((revenue / 5000000) * 100, 100);
    const canDat = revenue >= 5000000 ? 0 : 5000000 - revenue;

    useEffect(() => {
        dispatch(dailyRevenue());
    }, [dispatch]);

    const Example = ({ label, children }) => (
        <div>
            <h3>{label}</h3>
            {children}
        </div>
    );

    return (
        <>
            <div className="featured">
                <div className="top">
                    <div className="title">Doanh thu trong ngày</div>
                </div>
                <div className="bottom">
                    <div className="featured-chart">
                        <Example>
                            <CircularProgressbar
                                value={percentage}
                                text={`${percentage}%`}
                                styles={buildStyles({
                                    trailColor: "#00800033",
                                    pathColor: "#86c386",
                                    textColor: "#86c386"
                                })}
                            />
                        </Example>

                    </div>
                    <div className="title mt-3">Tổng doanh thu hôm nay</div>
                    <div className="amount">{revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>
                    <div className="summary">
                        <div className="items">
                            <div className="itemTitle">Mục tiêu</div>
                            <div className="itemResult ">
                                <FaChevronDown fontSize={'12px'} />
                                <div className="">5.000.000 đ</div>
                            </div>
                        </div>

                        <div className="items">
                            <div className="itemTitle">Cần thêm</div>
                            <div className="itemResult ">
                                <FaChevronDown fontSize={'12px'} color={"#ee6767"} />
                                <div className="can-them">{canDat.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>
                            </div>

                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}

export default Featured;