// This file contains utility functions that can be used throughout the application
// such as formatting dates, validating email addresses, and manipulating strings.
import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const getInitials = (name) => {
    if(!name) return "";

    const words = name.split(" ");
    let initials = "";

    for(let i = 0; i < Math.min(words.length,2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
}

export const addThousandsSeparator = (num) => {
    if(num === null || isNaN(num)) return 0;

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart ? `${formattedIntegerPart}.${fractionalPart}` : formattedIntegerPart;
}

export const prepareExpenseBarChartData = (data = []) =>{
    const chartData = data.map((item) => ({
        category:item?.category,
        amount: item?.amount,
        month: moment(item?.date).format("Do MMM"),
    }));

    return chartData;
}

export const prepareIncomeBarChartData = (data = []) =>{
    // console.log("data", data);
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month : moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        source: item?.source,
    }));

    return chartData;
}

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month : moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        category: item?.category,
    }));

    return chartData;
}

export const prepareTransactionBarChartData = (data = []) => {
    
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
    }));

    return chartData;
}