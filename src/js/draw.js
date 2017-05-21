export default {
    drawStickMan: function(times) {
        $(`.${times}`).removeClass('hidden');
    },
    clear: function() {
        let imgs = $('img');
        console.log(imgs);
        for (let i = 0; i < imgs.length; i += 1) {
            console.log(imgs[i]);
            $(imgs[i]).addClass('hidden');
        }
    }
}