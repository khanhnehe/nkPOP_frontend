import React from "react";
import "./Featured.scss"
import { IoMdMore } from "react-icons/io";
import ChangingProgressProvider from './ChangingProgressProvider';
import {
    CircularProgressbar, CircularProgressbarWithChildren, buildStyles
} from "react-circular-progressbar";
import { FaChevronDown } from "react-icons/fa";

import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
    return (
        <>
            <div className="featured">
                <div className="top">
                    <div className="title">Tổng doanh thu</div>
                    <IoMdMore fontSize={"23px"} />
                </div>
                <div className="bottom">
                    <div className="featured-chart">
                        <ChangingProgressProvider values={[0, 10, 20, 30, 40, 50, 60, 70, 80, 100]}>
                            {percentage => (
                                <div className="myProgressbar">
                                    <CircularProgressbar
                                        value={percentage}
                                        text={`${percentage}%`}
                                        styles={buildStyles({
                                            pathTransitionDuration: 0.95,
                                            trailColor: "#00800033",
                                            pathColor: "#86c386",
                                            textColor: "#86c386"
                                        })}
                                    />
                                </div>
                            )}
                        </ChangingProgressProvider>
                    </div>
                    <div className="title mt-3">Tổng doanh số bán hàng ngày hôm nay</div>
                    <div className="amount">10.000.000 đ</div>
                    <div className="desc">Giao dịch trước đó</div>
                    <div className="summary">
                        <div className="items">
                            <div className="itemTitle">Mục tiêu</div>
                            <div className="itemResult positive">
                                <FaChevronDown fontSize={'12px'} />
                                <div className="resultAmount ">9.000.000 đ</div>
                            </div>
                        </div>

                        <div className="items">
                            <div className="itemTitle">Tuần trước</div>
                            <div className="itemResult negative">
                                <FaChevronDown fontSize={'12px'} />
                                <div className="resultAmount">40.000.000 đ</div>
                            </div>

                        </div>

                        <div className="items">
                            <div className="itemTitle ">Tháng trước</div>
                            <div className="itemResult positive">
                                <FaChevronDown fontSize={'12px'} />
                                <div className="resultAmount ">260.000.000 đ</div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Featured;