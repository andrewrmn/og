<?php include('header.php'); ?>


    <div id="octocat-generator">

        <div id="ui-wrapper">
            <div class="wrapper-wide d-flex flex-items-center flex-justify-center">
                <div id="start-over">
                    <img class="mr-3" src="/build/images/svgs/undo.svg" alt="Restart Icon" />
                    <p class="d-none d-sm-block">Start Over</p>
                </div>

                <div class="octocat-name">
                    <input id="octocat-name" type="text" placeholder="Name Your Octocat" value="" />
                </div>

                <div id="save">
                    <p class="d-none d-sm-block">Finish & Share</p>
                    <img class="ml-2" src="/build/images/svgs/arrow-right.svg" alt="Restart Icon" />
                </div>
            </div>
        </div>



        <div id="artboard">
            <div id="asset-holders" class="artboard__inner">



                <svg version="1.1" id="octocat" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    	 viewBox="0 0 2000 2000" enable-background="new 0 0 2000 2000" xml:space="preserve" width="500" height="500" style="width: 500px; height: 500px;">

                    <g id="hair-back-holder" data-cat="hair"></g>

                    <?php include('includes/body/body.php'); ?>

                    <g id="pants-holder" data-cat="pants"></g>

                    <g id="shoes-holder" data-cat="shoes"></g>

                    <g id="shirts-holder" data-cat="shirts"></g>

                    <g id="accessories-holder" data-cat="accessories"></g>

                    <g id="hair-holder" data-cat="hair"></g>

                    <g id="headgear-holder" data-cat="headgear"></g>
                </svg>






            </div>

        </div>


        <nav id="control-panel">


            <?php include('categories/body.php'); ?>

            <?php include('categories/eyes.php'); ?>

            <?php include('categories/hair.php'); ?>
            <?php include('categories/hair-color.php'); ?>

            <?php include('categories/headgear.php'); ?>

            <?php include('categories/shirts.php'); ?>

            <?php include('categories/pants.php'); ?>

            <?php include('categories/shoes.php'); ?>

            <?php include('categories/accessories.php'); ?>




            <div id="object-list">
                <div>
                    <div class="category-tile category-tile--only-color" data-target="cp-body">
                        <span>
                            <img class="preview" src="/assets/body/octocat-preview.png" alt="" />
                        </span>
                    </div>
                    <div class="category-tile category-tile--only-color" data-target="cp-eyes">
                        <span>
                            <img class="preview" src="/assets/body/eye-preview.svg" alt="" />
                        </span>
                    </div>
                    <div class="category-tile" data-target="cp-hair">
                        <span>
                            <img class="preview" src="/assets/hair/hair-long-preview.svg" alt="" />
                        </span>
                    </div>
                    <div class="category-tile category-tile--only-color" data-target="cp-hair-color">
                        <span>
                            <img class="preview" src="/assets/hair/hair-long-preview.svg" alt="" />
                        </span>
                    </div>
                    <div class="category-tile" data-target="cp-headgear" id="headgear-preview">
                        <span>
                            <img class="preview" src="/assets/headgear/viking-hat-preview.svg" alt="" />
                        </span>
                    </div>
                    <div class="category-tile" data-target="cp-shirts">
                        <span>
                            <img class="preview" src="/assets/shirts/github-tee-preview.svg" alt="" />
                        </span>
                    </div>
                    <div class="category-tile" data-target="cp-pants">
                        <span>
                            <img class="preview" src="/assets/pants/jeans-preview.svg" alt="" />
                        </span>
                    </div>
                    <div class="category-tile" data-target="cp-shoes">
                        <span>
                            <img class="preview" src="/assets/shoes/sneaker-preview.svg" alt="" />
                        </span>
                    </div>
                    <div class="category-tile" data-target="cp-accessories">
                        <span>
                            <img class="preview" src="/assets/accessories/bag-preview.svg" alt="" />
                        </span>
                    </div>
                </div>
            </div>

        </nav>
    </div>

    <img id="img" src=""  width="500" height="500" />

    <canvas id="canvas" style="width: 500px; height: 500px; background: red;"></canvas>


<?php include('footer.php'); ?>
