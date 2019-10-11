/*
enum Choicetime2 {
    Year,
    Month,
    Day,
    Hour,
    Minute,
    Unixtime
}
*/

//% weight=70 icon="\uf075" color=#555555 block="時間"
namespace time {
    //% blockId=show_strings block="時間 %v"
    function unixtime(sec:number): void {
        //変数定義
        let t = [];
        let y = 0;
        let m = 0;
        let d = 0;
        let n = 0;
        let cnt = 0;
        const sec365 = 31536000;
        const sec366 = 31622400;
        let i = 0;

        //let sec = parseInt(in);

        //2000/01/01 00:00:00の例外
        if (sec == 946652400) {
            while (1) {
                basic.showString("2000:1:1:0:0");
            }
        }

        //9時間分の時差を補正
        sec = sec + 32400;

        //yearを求める
        let sec_y = sec;
        while (sec_y > sec365) {
            if (cnt % 4 == 2) {
                sec_y -= sec366;
                cnt += 1;
            } else {
                sec_y -= sec365;
                cnt += 1;
            }
        }
        y = 1970 + cnt;

        if (y % 4 == 0 && sec_y >= 5097600 && sec_y <= 5183999) {// 閏日
            m = 2;
            d = 29;
            let amaridays = Math.trunc(sec_y / 86400);
            let hour_pre = ((sec_y / 86400) - amaridays) * 24;
            let hour = Math.abs(hour_pre);
            let hour_show = Math.trunc(hour_pre);
            let min_pre = hour_pre + 9 + "";
            let min = parseFloat('0.' + min_pre.split(".")[1]) * 60;
            let min_int = Math.trunc(Math.round(min * 10000000000) / 10000000000);

            let y_int = Math.trunc(y);
            const x = "" + (y_int) + ":" + (m) + ":" + (d) + ":" + (hour_show) + ":" + (min_int);

            while (1) {
                basic.showString(x);
                //basic.showNumber(min_int);
            }
        } else {//うるう日以外
            let amaridays = Math.trunc(sec_y / 86400);
            if (y % 4 == 0) {//うるう年のうるう日以外
                t = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
                for (i = 0; i < 14; i++) {
                    if (amaridays < t[i]) {
                        d = amaridays - t[i - 1] + 1;
                        break;
                    }
                }
                m = i;

                let hour_pre = ((sec_y / 86400) - amaridays) * 24;
                let hour = Math.abs(hour_pre);
                let hour_show = Math.trunc(hour_pre);
                let min_pre = hour_pre + 9 + "";
                let min = parseFloat('0.' + min_pre.split(".")[1]) * 60;
                let min_int = Math.trunc(Math.round(min * 10000000000) / 10000000000);

                let y_int = Math.trunc(y);

                const x = "" + (y_int) + ":" + (m) + ":" + (d) + ":" + (hour_show) + ":" + (min_int);

                while (1) {
                    basic.showString(x);
                    //basic.showNumber(min_int);
                }

            } else {//通常年
                t = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
                for (i = 0; i < 14; i++) {
                    if (amaridays < t[i]) {
                        d = amaridays - t[i - 1] + 1;
                        break;
                    }
                }
                m = i;

                let hour_pre = ((sec_y / 86400) - amaridays) * 24;
                let hour = Math.abs(hour_pre);
                let hour_show = Math.trunc(hour_pre);
                let min_pre = hour_pre + 9 + "";
                let min = parseFloat('0.' + min_pre.split(".")[1]) * 60;
                let min_int = Math.trunc(Math.round(min * 10000000000) / 10000000000);

                let y_int = Math.trunc(y);

                const x = "" + (y_int) + ":" + (m) + ":" + (d) + ":" + (hour_show) + ":" + (min_int);

                while (1) {
                    basic.showString(x);
                    //basic.showNumber(min_int);
                }
            }
        }
    }
/*
    //% blockId=show_strings block="時間1 %v"
    export function turntime(e: Choicetime): void {
        // Add code here
    }
    */
}