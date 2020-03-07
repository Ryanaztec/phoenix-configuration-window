<template>
    <div class="container">
        <div class="line-four">
            <label>名称：</label>
            <input class="player-name" type="text" v-model="playerName">
            <label class="location-label">点位：</label>
            <input class="location" type="text" v-model="location">
            <label class="city-label">城市：</label>
            <input class="city" type="text" v-model="city">
        </div>
        <div class="line-one">
            <label>服务器地址：</label>
            <input class="ip-address" type="text" id="ip1" v-model="ip1">
            <input class="ip-address" type="text" id="ip2" v-model="ip2">
            <input class="ip-address" type="text" id="ip3" v-model="ip3">
            <input class="ip-address" type="text" id="ip4" v-model="ip4">
            <label class="port-label">端口：</label>
            <input class="port" type="text" id="port" v-model="port">
        </div>
        <div class="line-two">
            <label>X:</label>
            <input class="x-coordinate" type="text" v-model="xCoordinate">
            <label class="position-label">Y:</label>
            <input class="y-coordinate" type="text" v-model="yCoordinate">
            <label class="position-label">宽:</label>
            <input class="player-width" type="text" v-model="playerWidth">
            <label class="position-label">高:</label>
            <input class="player-height" type="text" v-model="playerHeight">
        </div>
        <div class="line-three">
            <span class="notify-text">{{notifyWords}}</span>
            <button class="button" @click="submit"><span class="button-text">保存</span></button>
        </div>

    </div>
</template>

<script>
  import fs from 'fs'
  import {checkName} from '../service/api'

  const config = 'D:/player-data/config/config.json'
  export default {
    data () {
      return {
        ip1: 127,
        ip2: 0,
        ip3: 0,
        ip4: 1,
        port: 8080,
        xCoordinate: 0,
        yCoordinate: 0,
        playerWidth: 500,
        playerHeight: 400,
        playerName: '北京西单',
        _playerName: '北京西单',
        location: 'BJ01',
        _location: 'BJ01',
        mac_address: '',
        notifyWords: null,
        city: '北京'
      }
    },
    mounted () {
      this.readFile()
    },
    methods: {
      submit () {
        const data = {
          ip_address: this.ip1 + '.' + this.ip2 + '.' + this.ip3 + '.' + this.ip4,
          mac_address: this.mac_address,
          port: this.port,
          window: {
            top: parseInt(this.yCoordinate),
            left: parseInt(this.xCoordinate),
            width: parseInt(this.playerWidth),
            height: parseInt(this.playerHeight)
          },
          name: this.playerName,
          location: this.location,
          city: this.city
        }

        if (this._playerName === this.playerName) { // 没有修改
          this.writeFile(data)
          return
        }

        checkName(this.playerName, this.location).then(res => {
          if (res.data.code === 1) {
            this.writeFile(data)
          } else {
            this.notifyWords = '名称已经存在'
          }
        })
      },
      writeFile (data) {
        fs.writeFile(config, JSON.stringify(data), (err) => {
          if (err === null) {
            this.notifyWords = '保存中...'
            this._playerName = this.playerName
            this._location = this.location
            setTimeout(() => {
              this.notifyWords = '配置文件保存成功!'
            }, 500)
          } else {
            this.notifyWords = err.toString()
          }
        })
      },
      readFile () {
        // eslint-disable-next-line handle-callback-err
        fs.readFile(config, 'utf8', (err, data) => {
          const list = JSON.parse(data)
          const ip = list.ip_address.split('.')
          this.port = list.port
          this.xCoordinate = parseInt(list.window.left)
          this.yCoordinate = parseInt(list.window.top)
          this.playerWidth = parseInt(list.window.width)
          this.playerHeight = parseInt(list.window.height)
          this.ip1 = ip[0]
          this.ip2 = ip[1]
          this.ip3 = ip[2]
          this.ip4 = ip[3]
          this.playerName = list.name
          this._playerName = list.name
          this.location = list.location
          this._location = list.location
          this.mac_address = list.mac_address
        })
      }
    }
  }
</script>

<style>
    .container {
        padding: 10px 10px;
        font-size: 16px;
        font-family: 微软雅黑, serif;
    }

    .player-name, .location, .city {
        width: 90px;
        text-align: center;
    }

    .ip-address, .port {
        width: 60px;
        text-align: center;
    }

    .x-coordinate, .y-coordinate, .player-width, .player-height {
        width: 81px;
        text-align: center;
    }

    .port-label {
        margin-left: 7px;
    }

    .location-label, .city-label {
        margin-left: 20px;
    }

    .position-label {
        margin-left: 20px;
    }

    .line-one, .line-two {
        margin-top: 20px;
    }

    .button-text {
        width: 28px;
        height: 19px;
        font-size: 14px;
        font-family: 微软雅黑, serif;
        color: rgba(255, 255, 255, 1);
        line-height: 19px;
    }

    .notify-text {
        vertical-align: middle;
    }

    .button {
        position: absolute;
        right: 33px;
        width: 120px;
        height: 30px;
        background: rgba(64, 139, 245, 1);
        border-radius: 3px;
        border: rgba(64, 139, 245, 1);
    }

    .line-three {
        margin-top: 25px;
    }
</style>
