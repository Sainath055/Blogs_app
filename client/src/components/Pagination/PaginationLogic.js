import React from 'react';

import { MdOutlineKeyboardArrowLeft} from "react-icons/md";
import { MdOutlineKeyboardArrowRight} from "react-icons/md";


import './Pagination.css';

const PaginationLogic = (props) => {
    const { size, step, onClickHandler, currentPageNum } = props;
  
    const showingNumbers = step * 2 + 1;
    let startNumber = 2;
    let startArrayNumber = props.step;
  
    let needStartDots = false;
    let needEndDots = false;
  
    if (currentPageNum > step) {
      startArrayNumber = currentPageNum - step;
  
      needStartDots = currentPageNum > step + startNumber ? true : false;
    }
  
    if (size > showingNumbers) {
      {
        needEndDots = size > currentPageNum + step + 1 ? true : false;
  
        if (size < currentPageNum + step + 1) {
          startArrayNumber = size - showingNumbers;
        }
      }
    }
  
    var contentNumber;
    
    return (
      <ul className="pagination">
        {currentPageNum > 1 ? (
        <li className="page-item prev arrow-icon"
            onClick={() => onClickHandler(currentPageNum - 1)}>
            <MdOutlineKeyboardArrowLeft />
        </li>
        ) : (
        <li className="page-item prev arrow-icon disabled">
            <MdOutlineKeyboardArrowLeft />
        </li>
        )}
        {size > showingNumbers + startNumber ? (
          <React.Fragment>
            <li
              onClick={(e) => onClickHandler(e.currentTarget.textContent)}
              className={`page-item ${currentPageNum === 1 && "active"}`}
            >
              1
            </li>
  
            {needStartDots && <span>...</span>}
            {_.times(showingNumbers, (i) => (
              <li
                key={i++}
                {...(contentNumber = needStartDots
                  ? startArrayNumber
                  : startNumber)}
                {...startNumber++}
                {...startArrayNumber++}
                className={`page-item ${currentPageNum === contentNumber && "active"}`}
                onClick={(e) => onClickHandler(e.currentTarget.textContent)}
              >
                {contentNumber}
              </li>
            ))}
            {needEndDots && <span>...</span>}
            <li
              className={`page-item ${currentPageNum === size && "active"}`}
              onClick={(e) => {
                onClickHandler(e.currentTarget.textContent)
            }}
            >
              {size}
            </li>
          </React.Fragment>
        ) : (
          ((startArrayNumber = 1),
          _.times(size, (i) => (
            <li
              key={i++}
              className={`page-item ${currentPageNum === startArrayNumber && "active"}`}
              onClick={(e) => onClickHandler(e.currentTarget.textContent)}
            >
              {startArrayNumber++}
            </li>
          ))) 
        )}
        {currentPageNum < size ? (
        <li className="page-item next arrow-icon"
        onClick={() => onClickHandler(currentPageNum + 1)}>
            <MdOutlineKeyboardArrowRight />
        </li>
        ) : (
        <li className="page-item next arrow-icon disabled">
            <MdOutlineKeyboardArrowRight />
        </li>
        )}
      </ul>
    );
  };


export default PaginationLogic;


  

  