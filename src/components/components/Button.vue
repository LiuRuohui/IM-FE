<script setup>
const props = defineProps([
    'id'
])
</script>
<template>
    <div class="switch">
        <input type="checkbox" :id="'switch-' + props.id" />
        <label :for="'switch-' + props.id">
            <span></span>
        </label>
    </div>
</template>
<style >
.switch {
    display: inline-block;
}
.switch input[type="checkbox"] {
    opacity: 0;
}
.switch label {
    cursor: pointer;
}
.switch span {
    display: inline-block;
    position: relative;
    width: 50px;
    height: 24px;
    background: #d1d5db;
    border-radius: 15px;
    transition: all 0.8s;
    border-style: solid;
    border-width: 1px;
}
.switch label span::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: transform 0.3s;
}
/* .switch label span::after {
    content: "OFF";
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.8rem;
    color: white;
} */

.switch input[type="checkbox"]:checked + label span::before {
    background: #d1d5db;
    transform: translateX(26px);
}
/* .switch input[type="checkbox"]:checked + label span::after {
    content: "ON";
    left: 6px;
    right: auto;
} */
.switch input[type="checkbox"]:checked + label span {
    background: white;
}
</style>