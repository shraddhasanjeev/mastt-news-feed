class MessageQueue {
    constructor() {
        this.queue = new Array();
    }

    getQueue() {
        return this.queue;
    }

    getSize() {
        return this.queue.length;
    }

    addMessage(message, id) {
        // if it is an empty set
        if (this.queue.length == 0) {
            message.id = (message.id + 1) * 1000 + id;
            this.queue.push(message);
        } else {
            message.id = (message.id + 1) * 1000 + id;
            for (let index = 0; index < this.queue.length;index++) {
                if (this.queue[index].id == message.id) {
                    return;
                }
            }
            //this.queue.push(message);

            // insert
            for (let index = this.queue.length - 1; index >= 0; index--) {
                if (compare(this.queue[index], message)) {
                    this.queue[index + 1] = this.queue[index];
                } else {
                    this.queue[index + 1] = message;
                    return;
                }
            }
            this.queue[0] = message;
        }
    }

    update() {
        this.queue = this.queue.filter((element) => {
            let currentTime = new Date();
            console.log(currentTime);
            if (element.end_date < currentTime) {
                return false;
            } else {
                return true;
            }
        })

        console.log(this.queue.filter((element) => {
            let date = new Date();
            date.setUTCDate(30);
            date.setUTCMonth(4);
            date.setUTCFullYear(2022);
            date.setUTCHours(12);
            date.setUTCMinutes(30);

            let newDate = new Date(2019, 5, 11, 5, 23, 59);

            console.log(newDate + " and" + element.end_date);

            if (element.end_date < date) {
                console.log("older");
                return false;
            } else {
                return true;
            }
        }))
    }

}

/*
 * for start_date, older -> smaller.
 * for end_date, older -> smaller
 */
function compare(a, b) {
    if (a.start_date > b.start_date) {
        return true;
    } else if (a.start_date == b.start_date) {
        if (a.end_date >= b.end_date) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}



module.exports = {
    MessageQueue
};


