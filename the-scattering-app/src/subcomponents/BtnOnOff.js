import '../styles/BtnOnOff.css'

function BtnOnOff() {
    return (
        <label class="toggle-switch">
        <input type="checkbox"/>
        <span class="toggle-switch__slider"></span>
        </label>
    )
}

export default BtnOnOff