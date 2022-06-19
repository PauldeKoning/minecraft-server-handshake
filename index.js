import net from 'net';
import leb128 from 'leb128';

export default class McServer {

    response;

    constructor(port, response) {
        this.response = response;

        this.server = net.createServer(conn => this.connect(conn));
        this.server.listen(port);
    }

    connect(conn) {
        conn.on('data', data => this.data(conn, data));
    }

    data(conn, data) {
        if (data.equals(Buffer.from('0100', 'hex'))) {
            conn.write(this.formatResponse());
        } else if (data.subarray(1, 2).equals(Buffer.from('01', 'hex'))) {
            conn.write(this.formatPong(data.subarray(2)));
            conn.destroy();
        }
    }

    formatResponse() {
        const respBuffer = Buffer.from(JSON.stringify(this.response));
        const respLengthBuffer = leb128.signed.encode(respBuffer.length);
        const packetLengthBuffer = leb128.signed.encode(respBuffer.length + respLengthBuffer.length + 1);

        return Buffer.concat(
            [
                packetLengthBuffer,
                Buffer.from('00', 'hex'), 
                respLengthBuffer, 
                respBuffer
            ]
        );
    }

    formatPong(longBuffer) {
        const packetLengthBuffer = leb128.signed.encode(longBuffer.length + 1);

        return Buffer.concat(
            [
                packetLengthBuffer,
                Buffer.from('01', 'hex'),
                longBuffer
            ]
        );
    }
}