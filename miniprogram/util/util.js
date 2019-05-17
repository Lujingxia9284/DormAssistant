/*
* @Author: Marte
* @Date:   2019-05-15 12:09:48
* @Last Modified by:   Marte
* @Last Modified time: 2019-05-15 12:15:39
*/

'use strict';
const formatDate = date =>{
    const year =date.getFullYear()
    const month =date.getMonth()+1
    const day =date.getDate()
    return [year, month, day].map(formatNumber).join('.')
}

const formatNumber =n =>{
    n=n.toString()
    return n[1] ? n:'0'+ n
}

module.exports = {
    formatDate :formatDate
}