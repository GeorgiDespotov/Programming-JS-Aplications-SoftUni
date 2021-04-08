import { html } from '../../node_modules/lit-html/lit-html.js';
import { createFurniture } from '../api/data.js'

const createTemplate = (onSubmit, invlMAke, invlModel, invlYear, invlDescr, invlPrice, invlImg) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${'form-control' + (invlMAke ? ' is-invalid' : ' is-valid' )} id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${'form-control' + (invlModel ? ' is-invalid' : ' is-valid' )} id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${'form-control' + (invlYear ? ' is-invalid' : ' is-valid' )} id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${'form-control' + (invlDescr ? ' is-invalid' : ' is-valid' )} id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${'form-control' + (invlPrice ? ' is-invalid' : ' is-valid' )} type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${'form-control' + (invlImg ? ' is-invalid' : ' is-valid' )} id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`;

export async function craetePage(ctx) {
    
    ctx.render(createTemplate(onSubmit))

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);

        const ent = {
            make: formData.get('make'),
            model: formData.get('model'),
            year: formData.get('year'),
            description: formData.get('description'),
            price: formData.get('price'),
            img: formData.get('img')
        }

        if (!ent.make || !ent.model || !ent.year || !ent.description || !ent.price || !ent.img) {
            ctx.render(createTemplate(onSubmit, !ent.make, !ent.model, !ent.year, !ent.description, !ent.price, !ent.img));

            return alert('Mandetory fields are required!');
        }
        ctx.render(createTemplate(onSubmit, !ent.make, !ent.model, !ent.year, !ent.description, !ent.price, !ent.img));

        if (ent.make.length < 4 || (Number(ent.year) < 1950 || Number(ent.year) > 2050) || ent.description.length < 10 || Number(ent.price) < 0) {
            ctx.render(createTemplate(onSubmit, ent.make.length < 4, ent.model.length < 4, (Number(ent.year) < 1950 || Number(ent.year) > 2050), ent.description.length < 10, Number(ent.price) < 0));
            return alert('Some fields are not field corectly!');
        }
        ctx.render(createTemplate(onSubmit, ent.make.length < 4, ent.model.length < 4, (Number(ent.year) < 1950 || Number(ent.year) > 2050), ent.description.length < 10, Number(ent.price) < 0));

        await createFurniture(ent);
        ctx.page.redirect('/');
    }
}