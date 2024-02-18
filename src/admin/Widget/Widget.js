import React from "react";
import "./Widget.scss"
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { PiNotepadDuotone } from "react-icons/pi";
import { IoWalletOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";




const Widget = ({ type }) => {

    let data;
    //giá trị tạm thời
    const amount = 500000;
    //khác bt diff ko hiểu
    const diff = 30;

    switch (type) {
        case "order":
            data = {
                title: "ĐƠN HÀNG",
                isMoney: false,
                link: "Xem tất cả đơn hàng",
                icon: (<PiNotepadDuotone className="icon"
                    style={{ color: "goldenrod", backgroundColor: "#daa52033", borderRadius: '5px' }}
                />)
            };
            break;
        case "revenue":
            data = {
                title: "DOANH THU",
                isMoney: true,
                link: "Xem chi tiết",
                icon: (<IoWalletOutline className="icon"
                    style={{ color: "green", backgroundColor: "#00800033", borderRadius: '5px' }}
                />)
            };
            break;
        case "user":
            data = {
                title: "NGƯỜI DÙNG",
                isMoney: false,
                link: "Xem tất cả người dùng",
                icon: (<IoPersonOutline className="icon"
                    style={{ color: "purple", backgroundColor: "#80008033", borderRadius: '5px' }}
                />)
            };
            break;
        case "out_stock":
            data = {
                title: "HẾT HÀNG",
                isMoney: false,
                link: "Xem hàng đã hết",
                icon: (<IoIosInformationCircleOutline className="icon"
                    style={{ color: "grenn", backgroundColor: "#ff000033", borderRadius: '5px' }}
                />)
            };
            break;
        default:
            break;
    }

    return (
        <>
            <div className="widget">
                <div className="left">
                    <span className="title">{data.title}</span>
                    <span className="counter">{amount}{data.isMoney && ' đ'}</span>
                    <span className="link">{data.link}</span>
                </div>
                <div className="right">
                    <div className="percentage positive">
                        <MdKeyboardArrowUp />
                        {diff}%
                    </div>
                    {data.icon}

                </div>
            </div>
        </>
    )
}

export default Widget;