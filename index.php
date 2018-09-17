<?php include('header.php'); ?>


<section class="octocat-intro" id="octocat-generator-intro">
    <div class="wrapper-wide">
        <div class="octocat-intro__content">
            <div class="col-12 col-sm-6 octocat-intro__text" data-animate-in="up" data-animate-in-delay="0">
                <h1 class="mb-3">
                    Build<br /> your own<br /> octocat</span>
                </h1>
                <p class="p-lg mb-4">Express yourself. Build your very own Octocat, share it out, and repeat.</p>
                <div class="pb-2">
                    <a class="btn" href="/generator.php">Create Your Octocat</a>
                </div>
            </div>
            <div class="col-12 col-sm-6 octocat-intro__octocat" data-animate-in="fade" data-animate-in-delay="0.3">
                <img class="mx-auto" src="./build/images/base-octocat.svg" alt="The Octocat" />
            </div>
        </div>
        
        <div class="col-6 text-sm-center text-md-right">
            <svg id="draw-svg" viewBox="0 0 481 150">
                <path id="draw-svg-line" opacity="0.2" fill="none" stroke="#24292E" stroke-linecap="round" stroke-linejoin="round" enable-background="new" d="
                    M77.3,0c0.3,32.1-11.7,57.7-35.8,76.9C24.6,90.3-20.5,85.5,13.1,47c35.7-40.9-92.9,0,93.3,0s349.3-6.7,349.3,53"/>

                <g id="draw-svg-arrow">
                <g>
                    <circle  fill="#24292E" cx="455" cy="126" r="24"/>
                    <circle fill="#444A50" cx="457" cy="124" r="24"/>
                    <path  fill="#FFFFFF" d="M457.1,128.3l-6.9-6.9c-0.1-0.1-0.2-0.3-0.2-0.4s0-0.3,0.1-0.4l0.9-0.9
                        c0.1-0.1,0.3-0.1,0.4-0.1s0.3,0,0.4,0.1l5.6,5.6l5.6-5.6c0.1-0.1,0.2-0.1,0.4-0.1s0.3,0,0.4,0.1l0.9,0.9c0.1,0.1,0.1,0.3,0.1,0.4
                        s0,0.3-0.1,0.4l-6.9,6.9c-0.1,0.1-0.3,0.1-0.4,0.1S457.2,128.4,457.1,128.3L457.1,128.3z"/>
                </g>
                </g>
            </svg>
        </div>
    </div>
</section>

<section class="wrapper pt-8 pb-8" id="how-it-works">
    <div class="text-center">
        <header class="mb-7" data-animate-in="up" data-animate-in-delay="0.4">
            <h2 class="mb-3">How it works</h2>
            <div class="col-12 col-sm-10 col-lg-7 mx-auto">
                <p>Creating your Octocat is easy and fun! Pick from dozens of options across hair styles, pants, shoes, and a whole lot more.</p>
            </div>
        </header>


        <div class="d-flex flex-wrap flex-justify-between">
            <div class="col-12 col-sm-4 mb-4 mb-sm-0 pl-sm-2 pr-sm-2 pl-md-3 pr-md-3" data-animate-in="up" data-animate-in-delay="0.4">
                <p class="h4">Step 1</p>
                <h3 class="h3 mb-3 mb-md-5">Pick an outfit</h3>
                <img src="./build/images/octocat-outfit.png" alt="Octocat Outfit" />
            </div>
            <div class="col-12 col-sm-4 mb-4 mb-sm-0 pl-sm-2 pr-sm-2 pl-md-3 pr-md-3" data-animate-in="up" data-animate-in-delay="0.5">
                <p class="h4">Step 2</p>
                <h3 class="h3 mb-3 mb-md-5">Style & accessorize</h3>
                <img src="./build/images/octocat-accessories.png" alt="Octocat accessories" />
            </div>
            <div class="col-12 col-sm-4 mb-4 mb-sm-0 pl-sm-2 pr-sm-2 pl-md-3 pr-md-3" data-animate-in="up" data-animate-in-delay="0.6">
                <p class="h4">Step 3</p>
                <h3 class="h3 mb-3 mb-md-5">Share it</h3>
                <img src="./build/images/octocat-share.svg" alt="share your octocat" />
            </div>
        </div>

    </div>

</section>


<aside class="pb-8 text-center" data-animate-in="up" data-animate-in-delay="0.6">
    <p class=" mb-4">What are you waiting for? Let’s do this.</p>
    <div class="pb-2">
        <a class="btn" href="/generator.php">Create Your Octocat</a>
    </div>
</aside>






<?php include('footer.php'); ?>
