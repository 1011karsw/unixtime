enum Choice {
    Year,
    Month,
    Day,
    Hour,
    Minute
}

//% color="#AA278D"
namespace basic {

    export function sec2date(sec = 0) {
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
            const x = [2000, 1, 1, 0, 0];
            return x;
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

            const x = [y_int, m, d, hour_show, min_int];
            return x;
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

                const x = [y_int, m, d, hour_show, min_int];
                return x;

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

                const x = [y_int, m, d, hour_show, min_int];
                return x;
            }
        }
    }

    //% block
    export function time(choice: Choice) {
        let result = sec2date();

        switch (choice) {
            case Choice.Year:
                return result[0];
            case Choice.Month:
                return result[1];
            case Choice.Day:
                return result[2];
            case Choice.Hour:
                return result[3];
            case Choice.Minute:
                return result[4];
            default:
                return 0;

        }
    }
}

