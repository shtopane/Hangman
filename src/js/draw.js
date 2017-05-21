export default {
    drawStickMan: function(times) {
        let selector = times - 1;
        $('.stickman').removeClass('hidden');
        $(`.${selector}`).removeClass('hidden');
    },
    clear: function() {
        $('.stickman').addClass('hidden');
        for (let i = 0; i < 5; i += 1) {
            $(`.${i}`).addClass('hidden');
        }
    }
}