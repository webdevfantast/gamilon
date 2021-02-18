<?php include_once 'temp/header.php'?>
<section class='zayavka auto-padding'>
    <div class='zayavka-content'>
        <div class='-title'>
            <div class='wrapper'>
                <h1>У вас готова заявка <br>
                    или остались вопросы?
                </h1>
                <p>Дайте нам знать и мы обязательно Вам перезвоним!</p>
            </div>
        </div>
        <div class='wrapper'>
            <form action="" method="post">
                <div class='-form'>
                    <label class='zayavka-label'>
                        <span>Введите Ваше имя:</span>
                        <input type="text" name="name" placeholder="Ваше имя">
                    </label>
                    <label class='zayavka-label'>
                        <span>Введите Ваш телефон:</span>
                        <input type="text" name="phone" placeholder="Ваш телефон">
                    </label>
                    <label class='zayavka-label'>
                        <span>Если есть готовая заявка:</span>
                        <input type="file" name="файл заявки">
                    </label>
                    <label class="form-politica">
                        <input type="radio" checked="" name="politica" value="Согласен" data-fancybox="" data-src="#politica"> <a href="#" data-fancybox="" data-src="#politica">Согласие на обработку данных</a>
                    </label>
					<button class="btn btn-blue">Отправить</button>
                </div>
            </form>
        </div>
    </div>
</section>
<?php include_once 'temp/footer.php'?>