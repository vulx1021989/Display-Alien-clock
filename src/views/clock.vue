
<template>
    <div class="home col-5 mx-auto py-5 mt-5">
      <h1 class="text-center">Display Alien clock</h1>
      <div class="card">
        <div class="card-body">
          <div class="form-group">
            <label for="alien">Earth clock:</label>
            <div id="digital-clock" style="text-align:center;"></div>
            <label for="alien">Alien clock:</label>
            <div class="mt-12" style ="display: inline-flex;">
                <input
                type="text"
                v-model="alien.year"
                class="form-control mt-2"
                id="date_alien"
                style ="margin-left: 5px;"
                placeholder="Year"
                />
                <select @change="changeDateByMonth"
                        v-model="alien.month"
                        class="form-control mt-2"  
                        id="date_alien"
                        style ="margin-left: 5px;">
                        <option disabled>Month</option>
                        <option v-for="i in 18" :value="i">{{ ('0' + (i)).slice(-2) }}</option>
                </select>
               <select
                    class="form-control mt-2"
                    id="date_alien"
                    v-model="alien.day"
                    style ="margin-left: 5px;">
                    <option disabled>Date</option>
                    <option v-for="i in dates_current" :value="i">{{ ('0' + (i)).slice(-2) }}</option>
               </select>

                <input
                type="number"
                v-model="alien.hour"
                class="form-control mt-2"
                style ="margin-left: 5px;"
                id="hour_alien"
                placeholder="hour"
                />
                <input
                type="number"
                v-model="alien.minute"
                class="form-control mt-2"
                style ="margin-left: 5px;"
                id="minute_alien"
                placeholder="minute"
                />
                <input
                type="number"
                v-model="alien.second"
                class="form-control mt-2"
                style ="margin-left: 5px;"
                id="second_alien"
                placeholder="second"
                />
            </div>
            <br/> <br/>
            <label for="alien">Set Alarm Alien clock: Date-Hour-Minute</label>
            <div class="mt-12" style ="display: inline-flex;">
               <select
                    class="form-control mt-2"
                    id="date_alien_alarm"
                    v-model="alarm.day"
                    style ="margin-left: 5px;">
                    <option disabled>Date</option>
                    <option v-for="i in dates_current" :value="i">{{ ('0' + (i)).slice(-2) }}</option>
               </select>
               <select
                    class="form-control mt-2"
                    id="hour_alien_alarm"
                    v-model="alarm.hour"
                    style ="margin-left: 5px;">
                    <option disabled>Hour</option>
                    <option value="0">00</option>
                    <option v-for="i in 36" :value="i">{{ ('0' + (i)).slice(-2) }}</option>
               </select>
                <select
                    class="form-control mt-2"
                    id="minute_alien_alarm"
                    v-model="alarm.minute"
                    style ="margin-left: 5px;">
                    <option disabled>Minute</option>
                    <option value="0">00</option>
                    <option v-for="i in 90" :value="i">{{ ('0' + (i)).slice(-2) }}</option>
               </select>
            </div>
            <br/>
            </div>
            <div class="mt-12" style = "clear: both; display: inline-flex; ">
                <button v-on:click="saveAlarm" style ="margin-left: 5px; width: 125px;" class="form-control mt-1 btn-primary">Save alarm</button>
                <button v-on:click="stopAlarm" v-if="alarm_going_off" id = "alarm_going_off" class="form-control mt-1 btn-warning"
                style="width:125px; margin-left: 5px; color: aliceblue;">Stop alarm</button>
            </div>
            <br/>
            <label for="alien">Logs Alarm Alien clock:</label>
            <table>
                <tr v-for="(alarm, i) in alarms">
                    <td>ID: {{i+1}}, </td>
                    <td>Date: {{alarm.date}}, </td>
                    <td>Time: {{alarm.hour}}:{{ ('0' + (alarm.minute)).slice(-2) }}</td>
                    <td><button v-on:click="deleteAlarm(i)" class="btn btn-danger" style = "margin-left: 10px;">Delete</button></td>
                </tr>
            </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  import $ from "jquery";

  export default {
    data() {
      return {
        alien: {
          year: '2804',
          month: 1,
          day: 1,
          hour: 0,
          minute: 0,
          second: 0,
        },

        alarm: {
          day: 1,
          hour: 0,
          minute: 0,
        },

        time: new Date(),
        alarm_going_off: false,
        alarms: [],

        months_date: {
            1:44,
            2:42,
            3:48,
            4:40,
            5:48,
            6:44,
            7:40,
            8:44,
            9:42,
            10:40,
            11:40,
            12:42,
            13:44,
            14:48,
            15:42,
            16:40,
            17:44,
            18:38,
        },
        dates_current: 48,
        months: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        errors: []
      };
    },

    created() {
        // update the time every second
        this.interval = setInterval(() => {
            this.alien.second = this.alien.second + 1;
            // 90s = 1m
            if(this.alien.second == 90) {
                this.alien.second = 0;
                this.alien.minute = this.alien.minute + 1;
            }
            // 90m = 1h
            if(this.alien.minute == 90) {
                this.alien.minute = 0;
                this.alien.hour = this.alien.hour + 1;
            }
            // 1d = 36h
            if(this.alien.hour == 36) {
                this.alien.hour = 0;
                this.alien.day = this.alien.day + 1;
            }

            // months and days relative
            // 1d = 36h
            if(this.alien.day == this.months_date[this.alien.month]) {
                this.alien.day = 1;
                this.alien.month = this.alien.month + 1;
            }
            // 18 months in year
            if(this.alien.month == 18) {
                this.alien.month = 1;
                this.alien.year = this.alien.year + 1;
            }
            this.time = new Date();
        }, 500);
    },

    computed() {

    },

    mounted() {
        this.interval = setInterval(() => {
            var currentTime = this.getDateTime();
            document.getElementById("digital-clock").innerHTML = currentTime;
        }, 1000);
        this.calculatorTotalsecond("1970-1-1 12:00:00");
        if (localStorage.alarms) {
            this.alarms = JSON.parse(localStorage.getItem('alarms'));
        }    
    },

    methods: {

        // set Alarm
        saveAlarm: function() {
            let new_alarm = {
                date: $('#date_alien_alarm option:selected').text(),
                hour: $("#hour_alien_alarm option:selected").text(),
                minute: parseInt($("#minute_alien_alarm option:selected").text()),
            };
            this.alarms.push(new_alarm);
            localStorage.setItem("alarms", JSON.stringify(this.alarms));
        },

        stopAlarm: function() {
            this.alarm_going_off = false;
            app.alarm_going_off  = false;
            speechSynthesis.cancel();
        },
        deleteAlarm: function(toRemove) {
            let new_alarms = [];
            $.each(this.alarms, function(i, v) {
            if (i != toRemove) {
                new_alarms.push(v);
            }
            });
            this.alarms = new_alarms;
        },

        changeDateByMonth(event) {
            this.dates_current = this.months_date[event.target.value];
        },

        calculatorTotalsecond(earth_time) {
            let date_earth_first = new Date("1970-1-1 12:00:00");
            let now              = new Date(); 
            let secondDifferent  = now - date_earth_first;
            let totalSecondInYear   = this.totalSecondInYear();
            this.alien.year    = 2804 + Math.floor(secondDifferent * 2/totalSecondInYear/1000);
            let month_and_day  = this.showMonthOfYear(secondDifferent, totalSecondInYear);
            this.alien.month   = month_and_day[0];
            this.dates_current = this.months_date[this.alien.month];
            this.alien.day     = month_and_day[1];
            this.alien.hour    = month_and_day[2];
            this.alien.minute  = month_and_day[3];
            this.alien.second  = month_and_day[4];
        },

        totalSecondInYear() {
            let totalDay = 0;
            Object.keys(this.months_date).forEach(function(k, v){
                totalDay = totalDay + v;
            });
            return totalDay*36*90*90;
        },

        showMonthOfYear(secondDifferent, totalSecondInYear)
        {
            let totalDayInYear = totalSecondInYear/(36*90*90);
            let totalDayReal   = secondDifferent*2/(36*90*90*1000);
            let totalDay       = Math.floor(totalDayReal % totalDayInYear);
            let totalDayAlien  = 0;
            let dateInMonth    = [];
            let dateAlien      = [];
            let hourAlien      = Math.floor((secondDifferent*2/(90*90*1000) + 2) % 36);
            let minuteAlien    = Math.floor((secondDifferent*2/(90*1000) +2) % 90);
            let secondAlien    = Math.floor((secondDifferent*2/(1000) +88) % 90);
            let monthAlien     = this.months_date;
            Object.keys(this.months_date).forEach(function(k, v){
                totalDayAlien = totalDayAlien + v;
                if(totalDay <= totalDayAlien) {
                    dateAlien.push(totalDay + 31 - (totalDayAlien - v));
                    dateInMonth.push(k-1);
                }
            });
            return [dateInMonth[0], dateAlien[0], hourAlien, minuteAlien, secondAlien];
        },

        getDateTime() {
            var now     = new Date(); 
            var year    = now.getFullYear();
            var month   = now.getMonth()+1; 
            var day     = now.getDate();
            var hour    = now.getHours();
            var minute  = now.getMinutes();
            var second  = now.getSeconds(); 
            if(month.toString().length == 1) {
                month = '0'+month;
            }
            if(day.toString().length == 1) {
                day = '0'+day;
            }   
            if(hour.toString().length == 1) {
                hour = '0'+hour;
            }
            if(minute.toString().length == 1) {
                minute = '0'+minute;
            }
            if(second.toString().length == 1) {
                second = '0'+second;
            }   
            var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
            return dateTime;
        }
    },
    watch: {
      alarms: function(newValue) {
        localStorage.setItem("alarms", JSON.stringify(newValue));
      },

      time: function(newValue) {
        if (this.alarm_going_off) {
          return;
        }
        let alien = this.alien;
        $.each(this.alarms, function(i, alarm) {
          if (
            parseInt(alarm.date) == parseInt(alien.day) &&
            parseInt(alarm.hour) == parseInt(alien.hour) &&
            parseInt(alarm.minute) == parseInt(alien.minute)
          ) {
            if (JSON.stringify(alarm) != JSON.stringify(window.lastAlarm)) {
              app.alarm_going_off  = true;
              this.alarm_going_off = true;
              window.lastAlarm = alarm;
              speakAlarm(alarm.message);
              return;
            }
          } else {
            window.lastAlarm = {};
          }
        }.bind(this));
      }

    },
  };

window.lastAlarm = {};

function speakAlarm(message) {
  if (!app.alarm_going_off) {
    return;
  }
  var msg = new SpeechSynthesisUtterance();
  if (message) {
    msg.text = "Alarm going off for " + message;
  } else {
    msg.text = "Alarm going off.";
  }
  
  msg.lang = "en-US";

  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
  msg.onend = function() {
    speakAlarm(message);
  };
}

</script>
  