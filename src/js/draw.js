export default {
    drawStickMan: function(times) {
        $('.stickman').removeClass('hidden');
        $(`.${times}`).removeClass('hidden');
    },
    clear: function() {
        $('.stickman').addClass('hidden');
        for(let i=1;i<=5;i+=1){
            $(`.${i}`).addClass('hidden');
        }
    }
}