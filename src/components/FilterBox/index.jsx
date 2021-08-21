import React from 'react';
import { FilterItem, Wrapper } from './FilterBox.styles';

const FilterBox = ({ filter, setFilter, options }) => {
  return (
    <Wrapper>
      <ul>
        {options.map((option, index) => {
          return (
            <FilterItem
              key={index}
              active={filter === option.filter_active}
              onClick={() => setFilter(option.filter_active)}
            >
              {option.label}
            </FilterItem>
          );
        })}
      </ul>
    </Wrapper>
  );
};

export default FilterBox;
