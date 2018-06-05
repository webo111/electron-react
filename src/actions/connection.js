'use strict';

/*import {Client} from 'ssh2';
import net from 'net';
import Redis from 'ioredis';
import _ from 'lodash';*/
import * as type from './type';

export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
});
/*
export const connectToRedis = (data, category) => {
    let sshErrorThrown = false;
    let redisErrorThrown = false;
    let redisErrorMessage;
    const conn = new Client();
    conn.on('ready', () => {
        const server = net.createServer(function (sock) {
            conn.forwardOut(sock.remoteAddress, sock.remotePort, config.host, config.port, (err, stream) => {
                if (err) {
                    sock.end()
                } else {
                    sock.pipe(stream).pipe(sock)
                }
            })
        }).listen(0, function () {
            handleRedis(config, { host: '127.0.0.1', port: server.address().port })
        })
    }).on('error', err => {
        sshErrorThrown = true;
        alert(`SSH Error: ${err.message}`);
    });
    function handleRedis(config, override) {
        const redis = new Redis(_.assign({}, config, override, {
            retryStrategy() {
                return false;
            }
        }));
        redis.defineCommand('setKeepTTL', {
            numberOfKeys: 1,
            lua: 'local ttl = redis.call("pttl", KEYS[1]) if ttl > 0 then return redis.call("SET", KEYS[1], ARGV[1], "PX", ttl) else return redis.call("SET", KEYS[1], ARGV[1]) end'
        });
        redis.defineCommand('lremindex', {
            numberOfKeys: 1,
            lua: 'local FLAG = "$$#__@DELETE@_REDIS_@PRO@__#$$" redis.call("lset", KEYS[1], ARGV[1], FLAG) redis.call("lrem", KEYS[1], 1, FLAG)'
        });
        redis.defineCommand('duplicateKey', {
            numberOfKeys: 2,
            lua: 'local dump = redis.call("dump", KEYS[1]) local pttl = 0 if ARGV[1] == "TTL" then pttl = redis.call("pttl", KEYS[1]) end return redis.call("restore", KEYS[2], pttl, dump)'
        });
        redis.once('connect', function () {
            redis.ping((err, res) => {
                if (err) {
                    if (err.message === 'Ready check failed: NOAUTH Authentication required.') {
                        err.message = 'Redis Error: Access denied. Please double-check your password.';
                    }
                    if (err.message !== 'Connection is closed.') {
                        alert(err.message);
                    }
                    return;
                }
                const version = redis.serverInfo.redis_version;
                if (version && version.length >= 5) {
                    const versionNumber = Number(version[0] + version[2]);
                    if (versionNumber < 28) {
                        alert('Medis only supports Redis >= 2.8 because servers older than 2.8 don\'t support SCAN command, which means it not possible to access keys without blocking Redis.');
                        return;
                    }
                }
                //next({redis, config, index: getIndex(getState)});
            })
        });
        redis.once('error', function (error) {
            redisErrorMessage = error;
        });
        redis.once('end', function () {
            if (!sshErrorThrown) {
                let msg = 'Redis Error: Connection failed. ';
                if (redisErrorMessage) {
                    msg += `(${redisErrorMessage})`;
                }
                alert(msg);
            }
        });
    }
    return ({
      type: type.RECEIVE_AUTH_DATA,
      data,
      category
    });
};*/
