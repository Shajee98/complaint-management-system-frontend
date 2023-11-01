import { StylesConfig } from 'react-select'

export const FilterSelectStyle: StylesConfig = {
    control: (styles, {isFocused}) => ({...styles, backgroundColor: 'white', width: '200px', outline: `${isFocused && 'none !important'}`, border: `${isFocused ? '2px solid #3373B1' : '2px solid #d0d5dd'}`, boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)', '&:hover': {border: `${isFocused && '2px solid #3373B1'}`}, borderRadius: '8px'}),
    option: (styles, {isSelected}) => {
        return {...styles, "&:hover": {backgroundColor: "#3373B1", color: "white"}, backgroundColor: `${isSelected ? '#3373B1' : 'white'}`, fontWeight: 'normal', cursor: 'pointer'}},
    container: (styles, {}) => {
        return {...styles}
    },
    indicatorSeparator: (styles) => {
        return {...styles, display: 'none'}
    },
}

export const FormSelectStyle: StylesConfig = {
    control: (styles, {isFocused, isDisabled}) => ({...styles, backgroundColor: 'white', width: '280px',outline: `${isFocused && 'none !important'}`, border: `${isFocused ? '2px solid #3373B1' : '2px solid #d0d5dd'}`, boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)', '&:hover': {border: `${isFocused && '2px solid #3373B1'}`}, borderRadius: '8px', cursor: `${isDisabled ? 'not-allowed' : 'pointer'}`}),
    option: (styles, {isSelected}) => {
        return {...styles, "&:hover": {backgroundColor: "#3373B1", color: "white"}, backgroundColor: `${isSelected ? '#3373B1' : 'white'} `}},
    container: (styles, {}) => {
        return {...styles}
    },
    indicatorSeparator: (styles) => {
        return {...styles, display: 'none'}
    },
}

export const StatusStyle: StylesConfig = {
    control: (styles, {isFocused}) => ({...styles, backgroundColor: 'white', width: '280px', outline: `${isFocused && 'none !important'}`, border: `${isFocused ? '2px solid #3373B1' : '2px solid #d0d5dd'}`, boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)', '&:hover': {border: `${isFocused && '2px solid #3373B1'}`}, borderRadius: '8px', cursor: 'pointer'}),
    option: (styles, {data, isSelected}) => {
        return {...styles, color: `${(data as any).color}`, backgroundColor: `${isSelected ? 'white' : 'white'}`, fontWeight: 'normal', cursor: 'pointer', '&:focus': {backgroundColor: 'white'}, '&:active': {backgroundColor: `${(data as any).color}`, color: 'white'}, '&:hover': {backgroundColor: `${(data as any).color}`, color: 'white'}}},
    container: (styles) => {
        return {...styles}
    },
    singleValue: (styles, {data}) => {
        return {...styles, color: `${(data as any).color}`}
    },
    indicatorSeparator: (styles) => {
        return {...styles, display: 'none'}
    },
    
}