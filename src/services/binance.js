//gnt 2022-07-21 10:08:40
        
import http from "./httpService";

const apiUrl = 'http://localhost:8000/api/binance/';

export const intervals = [
    {id: '1m', value: '1m'},
    {id: '5m', value: '5m'},
    {id: '15m', value: '15m'},
    {id: '1h', value: '1h'},
    {id: '4h', value: '4h'},
    {id: '1d', value: '1d'}
];

export const limits = [
    {id: '100', value: '100'},
    {id: '200', value: '200'},
    {id: '500', value: '500'},
    {id: '1000', value: '1000'},
];

export function getUsdt() {
    return http.get(`${apiUrl}usdt`);
}

export function getKlines(symbol, interval, limit = 200) {
    return http.get(`${apiUrl}klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
}


