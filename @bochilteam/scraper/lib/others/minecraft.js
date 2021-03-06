"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusJava = exports.statusBedrock = void 0;
const dgram_1 = __importDefault(require("dgram"));
const net_1 = __importDefault(require("net"));
const events_1 = __importDefault(require("events"));
// TODO
async function statusBedrock(ip, port, opts = { timeout: 5 * 1000 }) {
}
exports.statusBedrock = statusBedrock;
// TODO
async function statusJava(ip, port, opts = { timeout: 5 * 1000 }) {
}
exports.statusJava = statusJava;
class UDPsocket extends events_1.default {
    constructor(ip, port, opts) {
        super();
        this.ip = ip;
        this.port = port;
        this.opts = opts;
        this.socket = dgram_1.default.createSocket('udp4');
    }
    connect() {
        if (!this.socket)
            return;
        this.socket.bind(this.port, this.ip);
    }
}
class TCPsocket extends events_1.default {
    constructor(ip, port, opts) {
        super();
        this.ip = ip;
        this.port = port;
        this.opts = opts;
        this.data = Buffer.alloc(0);
    }
    connect(opts) {
        this.socket = net_1.default.createConnection({
            host: this.ip,
            port: this.port,
            timeout: this.opts.timeout,
            ...opts
        });
    }
    write(data) {
        return this.data = Buffer.concat([this.data, data]);
    }
    writeVarInt(data) {
        var MSB = 0x80, REST = 0x7F, MSBALL = ~REST, INT = Math.pow(2, 31);
        let out = [];
        let offset = 0;
        while (data >= INT) {
            out[offset++] = (data & 0xFF) | MSB;
            data /= 128;
        }
        while (data & MSBALL) {
            out[offset++] = (data & 0xFF) | MSB;
            data >>>= 7;
        }
        out[offset] = data | 0;
        return this.write(Buffer.from(out));
        // let buf = Buffer.alloc(0);
        // do {
        //     let temp = data & 0b01111111
        //     data >>>= 7
        //     if (data != 0) {
        //         temp |= 0b10000000
        //     }
        //     buf = Buffer.concat([buf, Buffer.from([temp])])
        // } while (data != 0)
        // return this.write(Buffer.from(buf))
    }
    send() {
        if (!this.socket)
            this.connect();
        return new Promise((resolve, reject) => {
            var _a, _b;
            (_b = (_a = this.socket) === null || _a === void 0 ? void 0 : _a.write) === null || _b === void 0 ? void 0 : _b.call(_a, this.data, (err) => {
                if (err)
                    return reject(err);
                return resolve(void 0);
            });
        });
    }
}
