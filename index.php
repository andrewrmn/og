<?php include('header.php'); ?>


    <div id="octocat-generator">

        <div id="ui-wrapper">
            <div class="wrapper-wide d-flex flex-items-center flex-justify-center">
                <div id="start-over">
                    <img class="mr-3" src="/build/images/svgs/undo.svg" alt="Restart Icon" />
                    <p class="d-none d-sm-block">Start Over</p>
                </div>

                <div id="octocat-name">
                    <input type="text" placeholder="Name Your Octocat" value="" />
                </div>

                <div id="save">
                    <p class="d-none d-sm-block">Finish & Share</p>
                    <img class="ml-2" src="/build/images/svgs/arrow-right.svg" alt="Restart Icon" />
                </div>
            </div>
        </div>



        <div id="artboard">
            <div class="artboard__inner">
                <svg id="octocat" viewBox="0 0 2000 2000" xml:space="preserve">

                    <g id="hair-back-holder"></g>


                    <?php include('includes/body/body.php'); ?>

                    <g id="pants-holder"></g>

                    <g id="shoes-holder"></g>

                    <g id="shirts-holder"></g>

                    <g id="accessories-holder"></g>

                    <g id="hair-holder"></g>

                    <g id="headgear-holder"></g>
                </svg>
            </div>




        </div>

        <nav id="control-panel">


            <?php include('categories/body.php'); ?>

            <?php include('categories/eyes.php'); ?>

            <?php include('categories/hair.php'); ?>

            <?php include('categories/headgear.php'); ?>

            <?php include('categories/shirts.php'); ?>

            <?php include('categories/pants.php'); ?>

            <?php include('categories/shoes.php'); ?>

            <?php include('categories/accessories.php'); ?>




            <div id="object-list">
                <div>
                    <div class="category-tile category-tile--only-color" data-target="cp-body">
                        <img class="preview" src="/build/images/body/octocat-preview.png" alt="" />
                    </div>
                    <div class="category-tile category-tile--only-color" data-target="cp-eyes">
                        <img class="preview" src="/build/images/body/eye-preview.svg" alt="" />
                    </div>
                    <div class="category-tile" data-target="cp-hair">
                        <img class="preview" src="/build/images/hair/hair-long-preview.svg" alt="" />
                    </div>
                    <div class="category-tile" data-target="cp-headgear" id="headgear-preview">
                        <img class="preview" src="/build/images/headgear/viking-hat-preview.svg" alt="" />
                    </div>
                    <div class="category-tile" data-target="cp-shirts">
                        <img class="preview" src="/build/images/shirts/github-tee-preview.svg" alt="" />
                    </div>
                    <div class="category-tile" data-target="cp-pants">
                        <img class="preview" src="/build/images/pants/jeans-preview.svg" alt="" />
                    </div>
                    <div class="category-tile" data-target="cp-shoes">
                        <img class="preview" src="/build/images/shoes/sneaker-preview.svg" alt="" />
                    </div>
                    <div class="category-tile" data-target="cp-accessories">
                        <img class="preview" src="/build/images/accessories/bag-preview.svg" alt="" />
                    </div>
                </div>
            </div>

        </nav>
    </div>

<?php include('footer.php'); ?>
