import { Injectable } from '@angular/core';


@Injectable()
export class ToolTipService {
  private inventoryDescription = {
    item_code: 'Unique Code for Inventory item',
    item_status: 'Status of Inventory Item',
    item_class: 'Used for clasification of items',
    usage_period: 'Usage period(in hours) in user inventory',
    global_units: 'Total Units of Inventory Item in Global Inventory',
    global_available_units: 'Current Available Units in Global Inventory',
    default_distrib_units: 'Default Units of Item distributed by an API call',
    attribs: 'JSON of additional custom attributes',
    is_tradable: ' checks if the inventory item can be tradable with global inventory to get return value',
    stackable_max_units: 'Maximum number of item units user can stack. -1=Infinite, If item is not stackable, then default value is 1',
    max_stash_limit: 'Maximum number of item units till which stash should be maintained',
    default_initial_units: 'Minimum units user will have in his inventory'
  };

  public inventory(field_name) {
    return this.inventoryDescription[field_name];
  }

  // tslint:disable-next-line:member-ordering
  private bundleDescription = {
    bundle_code: 'Unique Code for Bundle item',
    bundle_status: 'Status of bundle Item',
    bundle_class: 'Used for clasification of bundles',
  };

  public bundle(field_name) {
    return this.bundleDescription[field_name];
  }

  // tslint:disable-next-line:member-ordering
  private storeDescription = {
    store_code: 'Unique Code for Store name',
    priority: 'Priority of store',
    store_status: 'Status of store',
    store_expiry: 'Set date for store expiration',
    attribs: 'JSON of additional custom attributes',
    store_items: {
      app_purchase_store: 'Purchase store for item',
      attribs: 'JSON of additional custom attributes for store item',
      tag: 'tag for store item',
      max_purchase_count: 'maximum purchase count',
      element_start: 'start date for item',
      element_end: 'End date for item',
      discount: 'Actual cost is based on discount of base cost'
    }
  };

  public store(field_name) {
    if (field_name.includes('.')) {
      const sp = field_name.split('.');
      // console.log('splitted', sp);
      return this.storeDescription[sp[0]][sp[1]];
    } else {
      return this.storeDescription[field_name];
    }
  }

}

