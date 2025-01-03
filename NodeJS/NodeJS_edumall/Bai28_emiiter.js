function Emitter() {
    this.events = {};
}

Emitter.prototype.on = function(type, listener) {
    this.events[type] = this.events[type] || [];    //nếu chưa có thì trả về mảng rỗng
    this.events[type].push(listener);   //đẩy vào mảng
}

Emitter.prototype.emit = function(type) {
    if(this.events[type]) { //nếu có sự kiện trong mảng này
        this.events[type].forEach(function(listener) {
            //listener là giá trị của mảng this.events[type] trong mỗi vòng lặp
            //ta sẽ quy ước listener là 1 hàm
            //bây giờ gọi hàm đó
            listener();
        });
    }
}

module.exports = Emitter;