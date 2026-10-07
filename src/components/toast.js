import iziToast from "izitoast";

export const showToast = ({
    title = "",
    message = "",
    type = "info",
    position = "topCenter",
    timeout = 3000,
} = {}) => {
    iziToast[type]({
        title,
        message,
        position,
        timeout,
        close: false,
        progressBar: true,
        transitionIn: "fadeInDown",
        transitionOut: "fadeOutUp",
    });
};